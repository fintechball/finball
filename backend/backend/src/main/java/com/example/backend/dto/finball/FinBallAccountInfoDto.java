package com.example.backend.dto.finball;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FinBallAccountInfoDto {

    private String no;
    private String name;
    private Long balance;
    private Integer bookRefreshDate;
    private LocalDateTime createdAt;
    private LocalDateTime closedAt;

}
