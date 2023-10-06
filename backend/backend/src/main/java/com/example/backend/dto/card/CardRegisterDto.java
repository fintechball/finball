package com.example.backend.dto.card;

import com.example.backend.entity.Card;
import com.example.backend.entity.Member;
import java.util.List;
import lombok.Data;

@Data
public class CardRegisterDto {

    @Data
    public static class Request {
        private int updateWeek;
        private List<CardDto> cardList;

    }

    public static Card toCard(CardDto cardDto, Member member) {
        return Card.builder()
                .number(cardDto.getCard().getNo())
                .image(cardDto.getCard().getImage())
                .name(cardDto.getCard().getName())
                .cpName(cardDto.getCompany().getName())
                .cpLogo(cardDto.getCompany().getLogo())
                .cpCode(cardDto.getCompany().getCode())
                .member(member)
                .build();
    }

}
