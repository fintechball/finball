package com.example.backend.dto.finball;

import com.example.backend.type.DealType;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadFinBallTradeHistoryDto {

    private Long id;
    private Long value;
    private LocalDate date;
    private LocalTime time;
    private DealType type;
    private Long balance;
    private OppositeDto opposite;
    private CategoryDto category;
}
