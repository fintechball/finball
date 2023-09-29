package com.example.backend.service;

import com.example.backend.dto.finball.DeleteFinancialBookCategoryDto;
import com.example.backend.dto.finball.GetFinancialBookDto;
import com.example.backend.dto.finball.ReadFinBallDto;
import com.example.backend.dto.finball.ReadFinBallHistoryDto;
import com.example.backend.dto.finball.RegisterFinBallBookDto;
import com.example.backend.dto.finball.RegisterFinBallDto;
import com.example.backend.dto.finball.RegisterFinancialBookCategoryDto;
import com.example.backend.dto.finball.SetCategoryData;
import com.example.backend.dto.finball.UpdateFinancialBookCategoryDto;
import com.example.backend.dto.finball.UsageAndMoneySourceDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.FinBallHistory;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.category.CategoryCustomRepository;
import com.example.backend.repository.category.CategoryRepository;
import com.example.backend.repository.finballaccount.FinBallAccountRepository;
import com.example.backend.repository.finballhistory.FinBallHistoryRepository;
import com.example.backend.type.DealType;
import com.example.backend.type.MoneySource;
import com.example.backend.type.Usage;
import java.util.ArrayList;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FinBallService {

    private final FinBallAccountRepository finBallAccountRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryCustomRepository categoryCustomRepository;
    private final FinBallHistoryRepository finBallHistoryRepository;

    public final Long FIN_BALL_CODE = 106L;
    public final String FIN_BALL_LOGO = "https://s3-hotsix.s3.ap-northeast-2.amazonaws.com/images/%ED%95%80%EB%B3%BC.png";
    public final Boolean CONNECTED = true;
    public final String FIN_BALL_NAME = "핀볼";

    public void createAccount(RegisterFinBallDto.Request request, Member member) {

        Optional<FinBallAccount> account = finBallAccountRepository.findByMemberId(member.getId());
        if (account.isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_IN_USE);
        }
        finBallAccountRepository.save(request.toFinballAccount(member));
    }

    public ReadFinBallDto.Response readFinBall(Member member) {

        FinBallAccount account = finBallAccountRepository.findByMemberId(member.getId())
                .orElseThrow(
                        () -> new CustomException(ErrorCode.DATA_NOT_FOUND)
                );

        ReadFinBallDto.Response response = account.toReadFinBallDto();
        response.setCompany(FIN_BALL_CODE, FIN_BALL_LOGO, FIN_BALL_NAME, CONNECTED);

        return response;
    }

    public GetFinancialBookDto.Response createCategory(RegisterFinBallBookDto.Request request,
            Member member) {
        //핀볼 계좌 없는 경우의 예외
        FinBallAccount account = getFinballAccount(member);

        //이미 가계부가 있는 경우에 대한 예외
        ArrayList<Category> categoryCheckList = categoryRepository.findAllByFinBallAccount(account);
        if (categoryCheckList.size() > 0) {
            throw new CustomException(ErrorCode.ALREADY_IN_USE);
        }

        ArrayList<Category> categories = request.toCategory(account);
        account.setBookRefreshDate(request.getRefreshDate());

        categoryRepository.saveAll(categories);
        finBallAccountRepository.save(account);

        return readFinancialBook(member);
    }

    public GetFinancialBookDto.Response readFinancialBook(Member member) {

        FinBallAccount account = getFinballAccount(member);

        ArrayList<Category> categories = categoryRepository.findAllByFinBallAccount(account);
        GetFinancialBookDto.Response response = new GetFinancialBookDto.Response(categories);
        response.setRefreshDate(account.getBookRefreshDate());

        return response;
    }

    public GetFinancialBookDto.Response addFinancialBookCategory(
            RegisterFinancialBookCategoryDto.Request request,
            Member member) {

        FinBallAccount account = getFinballAccount(member);

        ArrayList<Category> categories = request.toCategory(account);
        categoryRepository.saveAll(categories);

        return readFinancialBook(member);
    }

    @Transactional
    public GetFinancialBookDto.Response deleteFinancialBookCategory(
            DeleteFinancialBookCategoryDto.Request request,
            Member member) {

        FinBallAccount account = getFinballAccount(member);

        ArrayList<Category> deleteCategoryList = request.deleteCategory(
                categoryRepository.findAllByFinBallAccount(account), account);
        categoryCustomRepository.deleteAllByCategoryId(deleteCategoryList);

        return readFinancialBook(member);
    }

    public GetFinancialBookDto.Response updateFinancialBookCategory(
            UpdateFinancialBookCategoryDto.Request request, Member member) {

        FinBallAccount account = getFinballAccount(member);

        Category savedCategory = categoryRepository.findById(request.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Category updateCategory = request.updateCategory(savedCategory);
        categoryRepository.save(updateCategory);

        return readFinancialBook(member);

    }

    @Transactional
    public void deleteFinancialBook(Member member) {

        FinBallAccount account = getFinballAccount(member);
        categoryCustomRepository.deleteAllCategories(account);
    }

    //핀볼 계좌 체크하는 공통 로직 분리
    private FinBallAccount getFinballAccount(Member member) {

        FinBallAccount account = finBallAccountRepository.findByMemberId(member.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND)
                );

        return account;
    }

    public ReadFinBallHistoryDto.Response readFinBallHistoryList(Member member) {

        FinBallAccount account = getFinballAccount(member);
        ReadFinBallHistoryDto.Response response = new ReadFinBallHistoryDto.Response();

        response.toFinBallTradeHistoryDtoList(
                finBallHistoryRepository.findAllByFinBallAccountOrderByDateDesc(account));
        response.setAccount(account.toReadFinBallDto().getAccount());
        response.setCategoryList(categoryRepository.findAllByFinBallAccount(account));

        return response;
    }

    public ReadFinBallHistoryDto.Response setCategory(SetCategoryData.Request request,
            Member member) {

        FinBallAccount account = getFinballAccount(member);
        FinBallHistory tradeHistory = finBallHistoryRepository.findByFinBallAccountAndId(account,
                request.getTradeHistoryId()).orElseThrow(
                () -> new CustomException(ErrorCode.DATA_NOT_FOUND)
        );
        if (tradeHistory.getDealType() == DealType.입금) {
            throw new CustomException(ErrorCode.NOT_WITHDRAW_ERROR);
        }

        setCategory(tradeHistory, request);
        finBallHistoryRepository.save(tradeHistory);

        return readFinBallHistoryList(member);
    }

    public void setCategory(FinBallHistory tradeHistory, SetCategoryData.Request request) {

        Category requestCategory = categoryRepository.findByName(request.getCategoryName())
                .orElseThrow(
                        () -> new CustomException(ErrorCode.DATA_NOT_FOUND)
                );

        if (tradeHistory.getCategory() != null) { //비어있지 않다 => 그 전에 있던 것 취소해야함
            Category category = categoryRepository.findByName(tradeHistory.getCategory().getName())
                    .orElseThrow(
                            () -> new CustomException(ErrorCode.DATA_NOT_FOUND)
                    );
            category.minusUsedValue(tradeHistory.getValue()); //누적 금액에서 마이너스
            requestCategory.plusUsedValue(tradeHistory.getValue());
        } else {
            requestCategory.plusUsedValue(tradeHistory.getValue());
        }

        tradeHistory.setHistory(requestCategory);
    }

    public UsageAndMoneySourceDto.Response readUsageAndMoneySource() {
        UsageAndMoneySourceDto.Response response = new UsageAndMoneySourceDto.Response();

        response.setMoneySourceList(MoneySource.values());
        response.setUsageList(Usage.values());

        return response;
    }
}
