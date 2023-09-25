package com.example.backend.dto.account;

import com.example.backend.dto.company.CompanyDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class GetOppositeAccountDto {

    @Data
    public static class Request {
        private Long code;
        private String originNo;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private OppositeAccountDto oppositeAccountDto;
    }

}
