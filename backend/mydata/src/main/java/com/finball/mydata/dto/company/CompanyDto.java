package com.finball.mydata.dto.company;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {

    Long code;
    String name;
    String logo;
    boolean isConnected;

}
