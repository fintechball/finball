package com.example.backend.dto.groupaccount;

import com.example.backend.dto.finball.OppositeDto;
import com.example.backend.type.DealType;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GroupTradeHistoryDto {

    private Long id;
    private Long value;
    private Long balance;
    private LocalDate date;
    private LocalTime time;
    private DealType type;
    private OppositeDto opposite;
    private List<GroupGameResultDto> result;
}
