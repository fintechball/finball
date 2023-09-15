package com.finball.mydata.service;

import com.finball.mydata.dto.tradeHistory.AccountHistoryDto;
import com.finball.mydata.dto.tradeHistory.AccountHistoryInfoDto;
import com.finball.mydata.entity.TradeHistory;
import com.finball.mydata.repository.TradeHistoryCustomRepository;
import com.finball.mydata.repository.TradeHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TradeHistoryService {

    private final TradeHistoryRepository tradeHistoryRepository;
    private final TradeHistoryCustomRepository tradeHistoryCustomRepository;

    public AccountHistoryDto.Response getAccountHistory(AccountHistoryDto.Request request) {

        String accountId = request.getAccountId();
        List<TradeHistory> tradeHistoryList = tradeHistoryCustomRepository.findByAccountId(accountId);
        List<AccountHistoryInfoDto> accountHistoryList = new ArrayList<>();

        for(TradeHistory tradeHistory : tradeHistoryList) {
            accountHistoryList.add(tradeHistory.toAccountHistoryInfoDto());
        }

        return AccountHistoryDto.Response.toTradeHistoryList(accountHistoryList);
    }
}
