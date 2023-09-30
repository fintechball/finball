package com.example.backend.dto.finball;

import lombok.Data;

@Data
public class SetCategoryData {

    @Data
    public static class Request {

        private Long tradeHistoryId;
        private Long categoryId;
    }
}
