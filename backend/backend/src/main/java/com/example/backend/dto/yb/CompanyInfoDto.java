package com.example.backend.dto.yb;

import lombok.Data;

@Data
public class CompanyInfoDto {
    private String name;
    private String logo;
    private Long code;
    private boolean connected;
}
