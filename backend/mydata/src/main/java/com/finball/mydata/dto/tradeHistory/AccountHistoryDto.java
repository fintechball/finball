package com.finball.mydata.dto.tradeHistory;

import com.finball.mydata.type.DealType;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountHistoryDto {

    private Long id;
    private String accountNo;
    private Long value;
    private LocalDate date;
    private LocalTime time;
    private DealType type;
    private Long remain;
    private OppositeDto oppositeDto;

}
