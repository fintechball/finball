package com.example.backend.dto.mydata;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyInfoForMemberDto {
    Long code;
    String name;
    String logo;
    boolean isConnected;
}
