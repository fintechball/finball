package com.finball.mydata.dto.account;


import com.finball.mydata.dto.company.CompanyDto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;


@Builder
@Getter
@Data
public class BankAccountDto {

    private CompanyDto company;
    private AccountDto account;

}
