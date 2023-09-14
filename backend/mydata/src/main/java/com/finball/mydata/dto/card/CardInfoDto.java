package com.finball.mydata.dto.card;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardInfoDto {
    private String name;
    private String image;
    private String code;
    private String cardCompanyName;
    private String cardNumber;
}
