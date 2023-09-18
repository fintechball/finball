package com.finball.mydata.dto.company;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyInfoDto {
    private String code;
    private String name;
    private String img;
}
