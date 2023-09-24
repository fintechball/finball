package com.example.backend.dto.finball;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OppositeDto {

    private String userName;
    private String accountNo;
    private CompanyDto company;

}
