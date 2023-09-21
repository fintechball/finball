package com.example.backend.dto.account;

import com.example.backend.entity.Account;
import com.example.backend.entity.Member;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AccountRegisterInfoDto {
    private String bankName;
    private String bankImage;
    private Long bankCode;
    private String accountName;
    private String accountNumber;
    private String accountRegist;
    private String accountClose;

    public Account toAccount(Member member){
        return Account.builder()
                .accountNumber(accountNumber)
                .name(accountName)
                .cpLogo(bankImage)
                .cpName(bankName)
                .isFavorite(false)
                .createdDt(LocalDateTime.now())
                .member(member)
                .build();
    }
}
