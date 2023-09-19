package com.example.backend.dto.card;

import lombok.Data;

@Data
public class CardInfo {


    private String name;
    private String image;
    private Long code;
    private String cardCompanyName;
    private String cardNumber;

}
