package com.example.backend.dto.transfer;

import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.FinBallHistory;
import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.GroupAccountHistory;
import com.example.backend.type.DealType;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinBallTradeHistoryDto {

    private String accountNo;
    private Long value;
    private LocalDate date;
    private LocalTime time;
    private DealType type;
    private Long balance;
    private OppositeDto opposite;

    public FinBallHistory toFinBallHistory(FinBallAccount finBallAccount) {
        return FinBallHistory.builder()
                .value(this.value)
                .balance(this.balance)
                .date(LocalDateTime.now())
                .dealType(this.type)
                .target(opposite.getUserName())
                .opAccountNo(opposite.getAccountNo())
                .opBankCpLogo(opposite.getCompany().getLogo())
                .opBankCpName(opposite.getCompany().getName())
                .opBankCpCode(opposite.getCompany().getCode())
                .finBallAccount(finBallAccount)
                .build();
    }

    public GroupAccountHistory toGroupAccountHistory(GroupAccount groupAccount) {
        return GroupAccountHistory.builder()
                .value(this.value)
                .balance(this.balance)
                .date(LocalDateTime.now())
                .dealType(this.type)
                .target(opposite.getUserName())
                .opAccountNo(opposite.getAccountNo())
                .opBankCpLogo(opposite.getCompany().getLogo())
                .opBankCpName(opposite.getCompany().getName())
                .opBankCpCode(opposite.getCompany().getCode())
                .groupAccount(groupAccount)
                .build();
    }
}
