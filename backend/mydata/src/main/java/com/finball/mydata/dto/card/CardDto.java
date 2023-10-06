package com.finball.mydata.dto.card;

import com.finball.mydata.dto.company.CompanyDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardDto {
    private CardInfoDto card;
    private CompanyDto company;

}
