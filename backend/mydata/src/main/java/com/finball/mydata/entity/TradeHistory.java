package com.finball.mydata.entity;

import com.finball.mydata.dto.tradeHistory.AccountHistoryDto;
import com.finball.mydata.dto.tradeHistory.OppositeBankDto;
import com.finball.mydata.type.DealType;
import java.time.LocalDate;
import java.time.LocalTime;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TradeHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    private Long value;

    private Long remain;

    private LocalDate date;

    private LocalTime time;

    private DealType type;

    private String target;

    private String nickname;

    private String opAccount;

    private String opBankName;

    public AccountHistoryDto toAccountHistoryInfoDto() {
        OppositeBankDto oppositeBankDto = OppositeBankDto.builder()
                .bankName(this.opBankName)
                .account(this.opAccount)
                .nickname(this.nickname)
                .target(this.target)
                .build();

        return AccountHistoryDto.builder()
                .id(this.id)
                .value(this.value)
                .date(this.date)
                .time(this.time)
                .type(this.type)
                .remain(this.remain)
                .oppositeBankDto(oppositeBankDto)
                .build();
    }
}
