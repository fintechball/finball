package com.example.backend.dto.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class GetBalanceDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        Long balance;
    }


}
