package com.example.backend.service;

import com.example.backend.dto.finball.RegistFinballDto;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.finballaccount.FinBallAccountRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FinballService {

    private final FinBallAccountRepository finBallAccountRepository;

    public void createAccount(RegistFinballDto.Request request, Member member) {
        Optional<FinBallAccount> account = finBallAccountRepository.findByMemberId(member.getId());
        if (account.isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_IN_USE);
        }
        finBallAccountRepository.save(request.toFinballAccount(member));
    }
}
