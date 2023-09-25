package com.example.backend.dto.card;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

public class GetCardListDto {

    @Data
    @AllArgsConstructor
    public static class Response {

        private List<GetCardDto> getCardList;
    }
}
