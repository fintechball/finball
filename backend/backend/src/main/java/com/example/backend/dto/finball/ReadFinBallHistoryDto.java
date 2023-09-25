package com.example.backend.dto.finball;

import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallHistory;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class ReadFinBallHistoryDto {

    @Data
    public static class Response {

        private FinBallAccountInfoDto account;
        private ArrayList<FinBallTradeHistoryDto> tradeHistoryList;
        private ArrayList<String> categoryList = new ArrayList<>();

        public void toFinBallTradeHistoryDtoList(
                List<FinBallHistory> FinBallAccountHistoryList) {

            tradeHistoryList = new ArrayList<>();

            for (FinBallHistory finBallHistory : FinBallAccountHistoryList) {
                tradeHistoryList.add(finBallHistory.toFinBallHistoryDto());
            }
        }

        public void setCategoryList(ArrayList<Category> categoryDtoList) {
            categoryList = new ArrayList<>();

            for (Category category : categoryDtoList) {
                categoryList.add(category.getName());
            }
        }
    }
}
