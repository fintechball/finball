package com.finball.mydata.controller;

import com.finball.mydata.service.TradeHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class TradeHistoryController {
    private final TradeHistoryService tradeHistoryService;
}
