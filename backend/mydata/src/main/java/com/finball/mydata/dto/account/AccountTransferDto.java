package com.finball.mydata.dto.account;

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
        public TradeHistory toTradeHistory(Account account, Account opAccount, Company company,
                DealType type) {
            return TradeHistory.builder()
                    .company(company)
                    .account(account)
                    .date(LocalDate.now())
                    .nickname(null)
                    .opAccount(opAccount == null ? (type == DealType.입금 ? this.minusBank
                            .getAccountNumber() : this.plusBank.getAccountNumber())
                            : opAccount.getAccountNo())
                    .opBankName(opAccount == null ? "findBall" : opAccount.getCompany().getCpName())
                    .type(type)
                    .remain(account.getBalance() + (type == DealType.입금 ? this.value : -this.value))
                    .value(this.value)
                    .time(LocalTime.now())
                    .target(null)
                    .build();
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private List<TransferResponseDto> list;
    }
}