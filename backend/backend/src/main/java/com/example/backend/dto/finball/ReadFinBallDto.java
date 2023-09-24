package com.example.backend.dto.finball;

import lombok.Builder;
import lombok.Data;

@Data
public class ReadFinBallDto {

    @Builder
    @Data
    public static class Response {

        private FinBallAccountInfoDto account;
    }
}
