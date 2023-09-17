package com.example.backend.dto.card;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class CardCompanyListDto {

    @Data
    @AllArgsConstructor
    public static class Response {
        private List<CardCompanyInfo> bankList;
    }

}
