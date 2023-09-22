package com.finball.mydata.dto.company;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
public class CompanyCodeDto {

    @AllArgsConstructor
    @Data
    public static class Response {
        Long cpCode;
    }
}
