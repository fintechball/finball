package com.finball.mydata.dto.company;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

public class CompanyListDto {

    @Data
    @AllArgsConstructor
    public static class Response {

        private List<CompanyDto> companyList;
    }

}
