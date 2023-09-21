package com.example.backend.dto.card;

import com.example.backend.entity.Card;
import com.example.backend.entity.Member;
import java.util.List;
import lombok.Data;

@Data
public class CardRegisterDto {

    @Data
    public static class Request {

        List<CardDto> cardDtoList;

    }

    public static Card toCard(CardDto cardDto, Member member) {
        return Card.builder()
                .cardNumber(cardDto.getCardNumber())
                .cpName(cardDto.getCompanyName())
                .image(cardDto.getCardImage())
                .name(cardDto.getCardName())
                .member(member)
                .build();
    }

}
