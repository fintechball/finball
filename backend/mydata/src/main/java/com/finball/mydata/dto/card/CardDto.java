package com.finball.mydata.dto.card;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardDto {
    private String cardName;
    private String cardImage;
    private String cardNumber;
    private String companyCode;
    private String companyName;

}
