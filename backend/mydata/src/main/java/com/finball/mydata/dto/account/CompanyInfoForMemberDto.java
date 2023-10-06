package com.finball.mydata.dto.account;

import com.finball.mydata.entity.Company;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyInfoForMemberDto {
    private Long id;
    private String cpName;
    private String cpLogo;

    public static CompanyInfoForMemberDto parseDto(Company company) {
        return CompanyInfoForMemberDto.builder()
//                .id(company.getId())
                .cpName(company.getCpName())
                .cpLogo(company.getCpLogo())
                .build();
    }
}
