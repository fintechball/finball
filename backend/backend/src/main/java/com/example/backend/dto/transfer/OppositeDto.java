package com.example.backend.dto.transfer;

import com.example.backend.dto.company.CompanyDto;
import com.example.backend.entity.FinBallHistory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OppositeDto {

    private String accountNo;
    private String userName;
    private CompanyDto company;

    public OppositeDto(FinBallHistory finBallHistory) {
        CompanyDto company = CompanyDto.builder()
                .code(finBallHistory.getOpBankCpCode())
                .logo(finBallHistory.getOpBankCpLogo())
                .name(finBallHistory.getOpBankCpName())
                .build();

        this.accountNo = finBallHistory.getOpAccountNo();
        this.userName = finBallHistory.getTarget();
        this.company = company;
    }
}
