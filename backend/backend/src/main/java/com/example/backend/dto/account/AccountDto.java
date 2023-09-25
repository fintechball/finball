package com.example.backend.dto.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountDto {

    private String name;
    private String no;
    private LocalDateTime createdAt;
    private LocalDateTime closedAt;
    private Long balance;

}
