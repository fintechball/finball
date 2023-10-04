package com.example.backend.dto.groupaccount;

import lombok.Data;

@Data
public class FillGroupAccountDto {
    @Data
    public static class Request {
        private long value;
        private String accountNo;
    }
}
