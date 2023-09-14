package com.finball.mydata.dto.tradeHistory;

import com.finball.mydata.type.DealType;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountHistoryInfoDto {

    private Long id;
    private Long value;
    private LocalDate date;
    private LocalTime time;
    private DealType type;
    private Long remain;
    private OppositeBankInfo oppositeBankInfo;

}
