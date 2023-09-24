package com.example.backend.dto.mydata;

import java.time.LocalDateTime;

import com.example.backend.dto.account.AccountDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberAccountInfoDto {

    private AccountDto account;
    private CompanyInfoForMemberDto company;
}