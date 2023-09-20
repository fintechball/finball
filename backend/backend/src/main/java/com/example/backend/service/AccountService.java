package com.example.backend.service;

import com.example.backend.dto.account.AccountRegisterDto;
import com.example.backend.dto.account.AccountRegisterInfoDto;
import com.example.backend.entity.Member;
import com.example.backend.repository.account.AccountRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    public void register(AccountRegisterDto.Request request, Member member) {

        for(AccountRegisterInfoDto info : request.getBankAccountDtoList()){
            accountRepository.save(info.toAccount(member));
        }
    }
}
