package com.finball.mydata.dto.tradeHistory;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
public class AccountHistoryDto {


    @Data
    @RequiredArgsConstructor
    public static class Request {
        String accountId;

    }

    @Data
    @Builder
    public static class Response {
        List<AccountHistoryInfoDto> tradeHistoryList;

        public static Response toTradeHistoryList(List<AccountHistoryInfoDto> tradeHistoryList) {
            return Response.builder().tradeHistoryList(tradeHistoryList).build();
        }
    }

}
