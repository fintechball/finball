package com.example.backend.dto.yb;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyInfoDto {
    private String name;
    private String logo;
    private Long code;
    private boolean connected;
}
