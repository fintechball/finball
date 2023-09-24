package com.finball.mydata.dto.tradeHistory;

import com.finball.mydata.dto.company.CompanyDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OppositeDto {

    private String accountNo;
    private String userName;
    private CompanyDto company;

}
