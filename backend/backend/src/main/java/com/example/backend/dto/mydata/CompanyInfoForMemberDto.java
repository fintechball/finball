package com.example.backend.dto.mydata;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyInfoForMemberDto {
    private Long id;
    private String cpName;
    private String cpLogo;
}
