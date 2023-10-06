package com.example.backend.dto.account;

import lombok.Data;

@Data
public class FavoriteAccountDto {

    @Data
    public static class Request {
        private String accountNo;
    }
}
