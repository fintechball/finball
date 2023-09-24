package com.example.backend.dto.company;

import lombok.Data;

@Data
public class CompanyDto {

    String name;
    String logo;
    Long code;
    boolean isConnected;

}
