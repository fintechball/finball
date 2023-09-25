package com.example.backend.dto.bank;

import com.example.backend.dto.yb.AccountInfoDto;
import com.example.backend.dto.yb.CompanyInfoDto;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BankAccountDto {

    private CompanyInfoDto company;
    private AccountInfoDto account;
}
