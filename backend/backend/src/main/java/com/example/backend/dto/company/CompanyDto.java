package com.example.backend.dto.company;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyDto {

    String name;
    String logo;
    Long code;
    boolean isConnected;

}
