package com.finball.mydata.dto.account;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AccountDto {

    private String name;
    private String no;
    private LocalDateTime createdAt;
    private LocalDateTime closedAt;
    private Long balance;

}
