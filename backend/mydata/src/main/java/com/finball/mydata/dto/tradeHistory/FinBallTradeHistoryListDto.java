package com.finball.mydata.dto.tradeHistory;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class FinBallTradeHistoryListDto {

    @Data
    @Builder
    @AllArgsConstructor
    public static class Response {
        List<FinBallTradeHistoryDto> finBallTradeHistoryDtoList;
    }

}
