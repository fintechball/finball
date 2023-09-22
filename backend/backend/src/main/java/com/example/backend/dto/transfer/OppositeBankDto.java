package com.example.backend.dto.transfer;

import com.example.backend.entity.FinBallHistory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OppositeBankDto {
    private String bankName;
    private String account;
    private String target;

    public OppositeBankDto(FinBallHistory finBallHistory) {
        this.bankName = finBallHistory.getOpBankName();
        this.account = finBallHistory.getOpAccount();
        this.target = finBallHistory.getTarget();
    }
}
