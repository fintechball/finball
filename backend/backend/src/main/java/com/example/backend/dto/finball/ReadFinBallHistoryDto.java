package com.example.backend.dto.finball;

import com.example.backend.entity.FinBallHistory;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class ReadFinBallHistoryDto {

    @Data
    public static class Response {

        private FinBallAccountInfoDto account;
        private ArrayList<FinBallTradeHistoryDto> tradeHistoryList = new ArrayList<>();

        public void toFinBallTradeHistoryDtoList(
                List<FinBallHistory> FinBallAccountHistoryList) {

            for (FinBallHistory finBallHistory : FinBallAccountHistoryList) {
                tradeHistoryList.add(finBallHistory.toFinBallHistoryDto());
            }
        }
    }
}
