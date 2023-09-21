package com.finball.mydata.dto.tradeHistory;

import com.finball.mydata.type.DealType;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FinBallTradeHistoryDto {

    private String accountNumber;
    private Long value;
    private LocalDate date;
    private LocalTime time;
    private DealType type;
    private Long remain;
    private OppositeBankDto oppositeBankDto;

}
