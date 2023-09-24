package com.finball.mydata.dto.account;

import com.finball.mydata.dto.company.CompanyDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OppositeAccountDto {

    private CompanyDto company;
    private String accountNo;
    private String name;
}
