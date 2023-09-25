package com.example.backend.dto.account;

import com.example.backend.dto.yb.AccountInfoDto;
import com.example.backend.dto.yb.CompanyInfoDto;
import com.example.backend.entity.Account;
import com.example.backend.entity.Member;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AccountRegisterInfoDto {
    private CompanyInfoDto company;
    private AccountInfoDto account;

    public Account toAccount(Member member){
        return Account.builder()
                .accountNo(account.getNo())
                .name(account.getName())
                .cpLogo(company.getLogo())
                .cpName(company.getName())
                .cpCode(company.getCode())
                .createdAt(LocalDateTime.now())
                .member(member)
                .build();
    }
}
