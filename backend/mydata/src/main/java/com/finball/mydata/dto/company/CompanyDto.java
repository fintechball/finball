package com.finball.mydata.dto.company;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CompanyDto {

    Long code;
    String name;
    String logo;
    boolean isConnected;

}
