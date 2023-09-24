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

    private String accountNumber;
    private Long value;
    private LocalDate date;
    private LocalTime time;
    private DealType type;
    private Long remain;
    private OppositeDto oppositeDto;

    public FinBallHistory toFinBallHistory(FinBallAccount finBallAccount) {
        return FinBallHistory.builder()
                .value(this.value)
                .balance(this.remain)
                .date(LocalDateTime.now())
                .dealType(this.type)
                .target(oppositeDto.getUserName())
                .opAccountNo(oppositeDto.getAccountNo())
                .opBankCpLogo(oppositeDto.getCompany().getLogo())
                .opBankCpName(oppositeDto.getCompany().getName())
                .opBankCpCode(oppositeDto.getCompany().getCode())
                .finBallAccount(finBallAccount)
                .build();
    }

    public GroupAccountHistory toGroupAccountHistory(GroupAccount groupAccount) {
        return GroupAccountHistory.builder()
                .value(this.value)
                .balance(this.remain)
//                .dealDt(LocalDateTime.now())
                .dealType(this.type)
                .target(oppositeDto.getUserName())
//                .opAccount(oppositeBankDto.getAccount())
//                .opBankName(oppositeBankDto.getBankName())
                .groupAccount(groupAccount)
                .build();
    }
}
