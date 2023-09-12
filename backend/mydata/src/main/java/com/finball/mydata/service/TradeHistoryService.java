package com.finball.mydata.service;

import com.finball.mydata.repository.TradeHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TradeHistoryService {
    private final TradeHistoryRepository tradeHistoryRepository;
}
