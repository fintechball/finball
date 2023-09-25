package com.finball.mydata.dto.account;

import com.finball.mydata.dto.company.CompanyDto;
import lombok.Builder;
import lombok.Data;

public class GetOppositeAccountDto {

    @Data
    public static class Request {
        private Long code;
        private String originNo;
    }

    @Data
    @Builder
    public static class Response {
        private OppositeAccountDto oppositeAccountDto;
    }

}