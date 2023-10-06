package com.finball.mydata.dto.tradeHistory;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
public class AccountHistoryListDto {


    @Data
    @RequiredArgsConstructor
    public static class Request {
        String accountNo;

    }

    @Data
    @Builder
    public static class Response {
        List<AccountHistoryDto> tradeHistoryList;

        public static Response toTradeHistoryDtoList(List<AccountHistoryDto> tradeHistoryList) {
            return Response.builder().tradeHistoryList(tradeHistoryList).build();
        }
    }

}
