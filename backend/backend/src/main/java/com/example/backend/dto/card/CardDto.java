package com.example.backend.dto.card;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardDto {


    private String cardName;
    private String cardImage;
    private String cardNumber;
    private Long companyCode;
    private String companyName;

}
