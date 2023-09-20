package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class TokenDto {

    @Data
    @AllArgsConstructor
    public static class Response {
        private String accessToken;
        private String refreshToken;
    }

}
