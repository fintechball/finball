package com.finball.mydata.entity;

import com.finball.mydata.dto.tradeHistory.AccountHistoryInfoDto;
import com.finball.mydata.dto.tradeHistory.OppositeBankInfo;
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

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

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

    @Builder
    public TradeHistory(Company company, Account account, Long value, Long remain,
                        LocalDate date, LocalTime time, DealType type, String target, String nickname,
                        String opAccount, String opBankName) {
        this.company = company;
        this.account = account;
        this.value = value;
        this.remain = remain;
        this.date = date;
        this.time = time;
        this.type = type;
        this.target = target;
        this.nickname = nickname;
        this.opAccount = opAccount;
        this.opBankName = opBankName;
    }

    public AccountHistoryInfoDto toAccountHistoryInfoDto() {
        OppositeBankInfo oppositeBankInfo = OppositeBankInfo.builder()
                .bankName(this.opBankName)
                .account(this.opAccount)
                .nickname(this.nickname)
                .target(this.target)
                .build();

        return AccountHistoryInfoDto.builder()
                .id(this.id)
                .value(this.value)
                .date(this.date)
                .time(this.time)
                .type(this.type)
                .remain(this.remain)
                .oppositeBankInfo(oppositeBankInfo)
                .build();
    }
}
