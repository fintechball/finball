package com.example.backend.service;

import com.example.backend.dto.finball.DeleteFinancialBookCategoryDto;
import com.example.backend.dto.finball.FinancialBookDto;
import com.example.backend.dto.finball.RegisterFinBallBookDto;
import com.example.backend.dto.finball.RegistFinballDto;
import com.example.backend.dto.finball.RegisterFinancialBookCategoryDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.category.CategoryCustomRepository;
import com.example.backend.repository.category.CategoryRepository;
import com.example.backend.repository.finballaccount.FinBallAccountRepository;
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

    public void createAccount(RegistFinballDto.Request request, Member member) {

        Optional<FinBallAccount> account = finBallAccountRepository.findByMemberId(member.getId());
        if (account.isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_IN_USE);
        }
        finBallAccountRepository.save(request.toFinballAccount(member));
    }

    public void createCategory(RegisterFinBallBookDto.Request request, Member member) {
        //핀볼 계좌 없는 경우의 예외
        FinBallAccount account = getFinballAccount(member);

        //이미 가계부가 있는 경우에 대한 예외
        ArrayList<Category> categoryCheckList = categoryRepository.findAllByFinBallAccount(account);
        if (categoryCheckList.size() > 0) {
            throw new CustomException(ErrorCode.ALREADY_IN_USE);
        }

        ArrayList<Category> categories = request.toCategory(account);
        account.setRefreshDate(request.getRefreshDate());

        categoryRepository.saveAll(categories);
        finBallAccountRepository.save(account);
    }

    public FinancialBookDto.Response readFinancialBook(Member member) {

        FinBallAccount account = getFinballAccount(member);

        ArrayList<Category> categories = categoryRepository.findAllByFinBallAccount(account);
        FinancialBookDto.Response response = new FinancialBookDto.Response(categories);
        response.setRefreshDate(account.getBookRefreshDate());

        return response;
    }

    public FinancialBookDto.Response addFinancialBookCategory(RegisterFinancialBookCategoryDto.Request request,
            Member member) {

        FinBallAccount account = getFinballAccount(member);

        ArrayList<Category> categories = request.toCategory(account);
        categoryRepository.saveAll(categories);

        return readFinancialBook(member);
    }

    @Transactional
    public FinancialBookDto.Response deleteFinancialBookCategory(DeleteFinancialBookCategoryDto.Request request,
            Member member) {

        FinBallAccount account = getFinballAccount(member);

        ArrayList<Category> deleteCategoryList = request.deleteCategory(
                categoryRepository.findAllByFinBallAccount(account), account);
        categoryCustomRepository.deleteAllByCategoryId(deleteCategoryList);

        return readFinancialBook(member);
    }

    //핀볼 계좌 체크하는 공통 로직 분리
    private FinBallAccount getFinballAccount(Member member) {

        FinBallAccount account = finBallAccountRepository.findByMemberId(member.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND)
                );

        return account;
    }

}
