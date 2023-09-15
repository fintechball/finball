package com.finball.mydata.controller;

import com.finball.mydata.dto.Response;
import com.finball.mydata.dto.tradeHistory.AccountHistoryDto;
import com.finball.mydata.service.TradeHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class TradeHistoryController {
    private final TradeHistoryService tradeHistoryService;

    @GetMapping("/mydata/account/history")
    public Response<AccountHistoryDto.Request> getAccountHistory(@RequestBody AccountHistoryDto.Request request) {

        AccountHistoryDto.Response response = tradeHistoryService.getAccountHistory(request);

        return new Response(200, "거래 목록 조회 완료", response);
    }

}
