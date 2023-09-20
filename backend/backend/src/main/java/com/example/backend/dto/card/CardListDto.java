package com.example.backend.dto.card;

import com.example.backend.entity.Card;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

public class CardListDto {

    @Data
    public static class Request {
        private List<Long> cardCompanyCodeList;
    }

    @Data
    @AllArgsConstructor
    public static class Response {

        private List<CardDto> cardDtoList;
    }
}
