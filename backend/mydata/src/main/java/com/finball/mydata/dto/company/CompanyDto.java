package com.finball.mydata.dto.company;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CompanyDto {

    String name;
    String img;
    Long code;
    boolean isConnected;

}
