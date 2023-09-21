package com.example.backend.dto.card;

import com.example.backend.entity.Card;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

public class GetCardListDto {

    @Data
    @AllArgsConstructor
    public static class Response {

        private List<GetCardDto> getCardDtoList;
    }

    public static GetCardDto toGetCardDto(Card card) {
        return GetCardDto.builder()
                .cardImage(card.getImage())
                .cardName(card.getName())
                .cardNumber(card.getCardNumber())
                .companyName(card.getCpName())
                .build();
    }
}
