package com.finball.mydata.dto.account;

import com.finball.mydata.dto.tradeHistory.AccountHistoryDto;
import com.finball.mydata.dto.tradeHistory.FinBallTradeHistoryDto;
import com.finball.mydata.dto.tradeHistory.OppositeBankDto;
import com.finball.mydata.entity.Account;
import com.finball.mydata.entity.Company;
import com.finball.mydata.entity.TradeHistory;
import com.finball.mydata.type.DealType;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
            String accountNumber = this.minusBank.getAccountNumber();
            if (type == DealType.출금) {
                value = -value;
                accountNumber = this.plusBank.getAccountNumber();
            }

            return TradeHistory.builder()
                    .company(company)
                    .account(account)
                    .date(LocalDate.now())
                    .nickname(null)
                    .opAccount(accountNumber)
                    .opBankName(company.getCpName())
                    .type(type)
                    .remain(account.getBalance() + value)
                    .value(this.value)
                    .time(LocalTime.now())
                    .target(null)
                    .build();
        }

        public OppositeBankDto toOppositeBankDto(String cpName, TransferInfoDto transferInfoDto) {

            return OppositeBankDto.builder()
                    .bankName(cpName)
                    .account(transferInfoDto.getAccountNumber())
                    .target(transferInfoDto.getTarget()).build();
        }

        public FinBallTradeHistoryDto toFinBallTradeHistoryDto(TransferInfoDto transferInfoDto, OppositeBankDto oppositeBankDto, DealType type, Long remain) {

//            return new FinBallTradeHistoryDto(transferInfoDto.getAccountNumber(), this.getValue(),
//                    LocalDate.now(), LocalTime.now(), type,
//                    transferInfoDto.getBalance() - this.getValue(), oppositeBankDto);

            return FinBallTradeHistoryDto.builder()
                    .accountNumber(transferInfoDto.getAccountNumber())
                    .value(this.getValue())
                    .date(LocalDate.now())
                    .time(LocalTime.now())
                    .type(type)
                    .remain(remain)
                    .oppositeBankDto(oppositeBankDto)
                    .build();

        }

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private List<FinBallTradeHistoryDto> list;
    }
}
