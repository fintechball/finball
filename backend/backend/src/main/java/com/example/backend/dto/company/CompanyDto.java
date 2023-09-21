package com.example.backend.dto.company;

import lombok.Data;

@Data
public class CompanyDto {

    String name;
    String img;
    Long code;
    boolean isConnected;

}
