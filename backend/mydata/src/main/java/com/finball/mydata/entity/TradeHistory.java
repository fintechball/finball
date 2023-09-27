package com.finball.mydata.entity;

import com.finball.mydata.dto.tradeHistory.AccountHistoryDto;
import com.finball.mydata.dto.tradeHistory.OppositeDto;
import com.finball.mydata.type.DealType;
import java.time.LocalDate;
import java.time.LocalTime;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class TradeHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    private Account account;

    private Long value;

    private Long remain;

    private LocalDate date;

    private LocalTime time;

    private DealType type;

    private String target;   // 상대방 이름

    private String opAccountNo;

    public AccountHistoryDto toAccountHistoryInfoDto() {
        OppositeDto oppositeDto = OppositeDto.builder()
                .accountNo(this.opAccountNo)
                .userName(target)
                .company(this.company.toCompanyDto())
                .build();

        return AccountHistoryDto.builder()
                .id(this.id)
                .accountNo(this.account.getAccountNo())
                .value(this.value)
                .date(this.date)
                .time(this.time)
                .type(this.type)
                .balance(this.remain)
                .opposite(oppositeDto)
                .build();
    }
}
