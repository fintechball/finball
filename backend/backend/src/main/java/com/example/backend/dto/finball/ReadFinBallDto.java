package com.example.backend.dto.finball;

import lombok.Builder;
import lombok.Data;

@Data
public class ReadFinBallDto {

    @Builder
    @Data
    public static class Response {

        private String accountNumber;       //핀볼계좌번호
        private long balance;               //잔액
        private String moneySource;         //자금출처
        private String usage;               //사용목적?
        private int bookRefreshDate;        //가계부 갱신일
    }
}
