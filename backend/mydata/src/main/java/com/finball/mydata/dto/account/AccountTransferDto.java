package com.finball.mydata.dto.account;

import com.finball.mydata.dto.tradeHistory.AccountHistoryDto;
import com.finball.mydata.dto.tradeHistory.OppositeDto;
import com.finball.mydata.entity.Account;
import com.finball.mydata.entity.Company;
import com.finball.mydata.entity.TradeHistory;
import com.finball.mydata.type.DealType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class AccountTransferDto {

    @Data
    @NoArgsConstructor
    public static class Request {

        private TransferInfoDto plusBank;
        private TransferInfoDto minusBank;
        private Long value;

        @Builder
        public TradeHistory toTradeHistory(Account account, Company company, DealType type) {

            Long value = this.value;
            String accountNumber = this.minusBank.getAccountNo();
            String target = this.minusBank.getUserName();
            if (type == DealType.출금) {
                value = -value;
                accountNumber = this.plusBank.getAccountNo();
                target = this.plusBank.getUserName();
            }

            return TradeHistory.builder()
                    .company(company)
                    .account(account)
                    .value(this.value)
                    .remain(account.getBalance() + value)
                    .date(LocalDate.now())
                    .time(LocalTime.now())
                    .type(type)
                    .target(target)
                    .opAccountNo(accountNumber)
                    .build();
        }

        public OppositeDto toOppositeDto(Company company, TransferInfoDto transferInfoDto) {

            return OppositeDto.builder()
                    .accountNo(transferInfoDto.getAccountNo())
                    .userName(transferInfoDto.getUserName())
                    .company(company.toCompanyDto())
                    .build();
        }

        public AccountHistoryDto toAccountHistoryDto(TransferInfoDto transferInfoDto, OppositeDto oppositeDto, DealType type, Long remain) {

            return AccountHistoryDto.builder()
                    .accountNo(transferInfoDto.getAccountNo())
                    .value(this.getValue())
                    .date(LocalDate.now())
                    .time(LocalTime.now())
                    .type(type)
                    .balance(remain)
                    .opposite(oppositeDto)
                    .build();

        }

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private List<AccountHistoryDto> list;
    }
}
