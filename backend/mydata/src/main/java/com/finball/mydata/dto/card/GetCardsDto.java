package com.finball.mydata.dto.card;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class GetCardsDto {

    @Data
    public static class Request {
        List<String> cardList;
    }

    @Data
    @Builder
    public static class Response {
        List<CardInfoDto> cardList;
    }
}
