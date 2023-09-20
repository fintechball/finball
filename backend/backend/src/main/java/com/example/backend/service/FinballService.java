package com.example.backend.service;

import com.example.backend.dto.finball.FinancialBookDto;
import com.example.backend.dto.finball.FinancialBookDto.Response;
import com.example.backend.dto.finball.RegistFinballBookDto;
import com.example.backend.dto.finball.RegistFinballDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.category.CategoryRepository;
import com.example.backend.repository.finballaccount.FinBallAccountRepository;
import java.util.ArrayList;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FinballService {

    private final FinBallAccountRepository finBallAccountRepository;
    private final CategoryRepository categoryRepository;

    public void createAccount(RegistFinballDto.Request request, Member member) {
        Optional<FinBallAccount> account = finBallAccountRepository.findByMemberId(member.getId());
        if (account.isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_IN_USE);
        }
        finBallAccountRepository.save(request.toFinballAccount(member));
    }

    public void createCategory(RegistFinballBookDto.Request request, Member member) {
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

        return response;
    }

    //핀볼 계좌 체크하는 공통 로직 분리
    private FinBallAccount getFinballAccount(Member member) {
        FinBallAccount account = finBallAccountRepository.findByMemberId(member.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND)
                );
        return account;
    }
}
