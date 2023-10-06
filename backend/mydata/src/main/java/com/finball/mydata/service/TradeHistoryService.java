package com.finball.mydata.service;

import com.finball.mydata.dto.tradeHistory.AccountHistoryDto;
import com.finball.mydata.dto.tradeHistory.AccountHistoryListDto;
import com.finball.mydata.entity.TradeHistory;
import com.finball.mydata.repository.TradeHistoryCustomRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TradeHistoryService {

    private final TradeHistoryCustomRepository tradeHistoryCustomRepository;

    public AccountHistoryListDto.Response getAccountHistory(AccountHistoryListDto.Request request) {

        String accountNo = request.getAccountNo();
        List<TradeHistory> tradeHistoryList = tradeHistoryCustomRepository
                .findByAccountId(accountNo);
        List<AccountHistoryDto> accountHistoryList = new ArrayList<>();

        for (TradeHistory tradeHistory : tradeHistoryList) {
            accountHistoryList.add(tradeHistory.toAccountHistoryInfoDto());
        }

        return AccountHistoryListDto.Response.toTradeHistoryDtoList(accountHistoryList);
    }
}
