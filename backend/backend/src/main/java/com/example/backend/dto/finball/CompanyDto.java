package com.example.backend.dto.finball;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyDto {

    private Long code;
    private String name;
    private String logo;
}
