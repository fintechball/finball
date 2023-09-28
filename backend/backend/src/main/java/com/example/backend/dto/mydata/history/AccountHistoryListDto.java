package com.example.backend.dto.mydata.history;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class AccountHistoryListDto {


    @Data
    @AllArgsConstructor
    public static class Request {
        private String accountNo;

    }

    @Data
    @AllArgsConstructor
    public static class Response {
        private List<AccountHistoryDto> tradeHistoryList;
    }

}
