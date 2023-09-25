package com.example.backend.dto.finball;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyDto {

    public Long code;
    public String name;
    public String logo;
    public Boolean connected;
}
