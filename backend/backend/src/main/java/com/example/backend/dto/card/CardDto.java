package com.example.backend.dto.card;

import lombok.Data;

@Data
public class CardDto {


    private String cardName;
    private String cardImage;
    private String cardNumber;
    private Long companyCode;
    private String companyName;

}
