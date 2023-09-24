package com.example.backend.dto.finball;

import com.example.backend.type.MoneySource;
import com.example.backend.type.Usage;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FinBallAccountInfoDto {

    private String no;
    private Long balance;
    private Integer bookRefreshDate;
    private LocalDate createdAt;
    private MoneySource moneySource;
    private Usage usage;

}
