package com.example.backend.dto.yb;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AccountInfoDto {
    private String name;
    private String no;
    private Long balance;
    private LocalDateTime createdAt;
    private LocalDateTime closedAt;
}
