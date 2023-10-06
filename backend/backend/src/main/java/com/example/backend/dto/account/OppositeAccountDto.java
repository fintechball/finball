package com.example.backend.dto.account;

import com.example.backend.dto.yb.CompanyInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OppositeAccountDto {

    private CompanyInfoDto company;
    private String accountNo;
    private String name;
}
