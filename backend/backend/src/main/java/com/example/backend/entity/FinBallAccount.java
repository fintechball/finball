package com.example.backend.entity;

import com.example.backend.dto.finball.ReadFinBallDto;
import com.example.backend.type.MoneySource;
import com.example.backend.type.Usage;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FinBallAccount {

    @Id
    @Column
    private String accountNumber;

    @Column
    private Long balance;

    @Column
    private LocalDateTime refreshDt;

    @Column
    @Enumerated(EnumType.STRING)
    private Usage usage;

    @Column
    @Enumerated(EnumType.STRING)
    private MoneySource moneySource;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Column
    private Integer bookRefreshDate; //가계부 refresh 날짜 (5일)

    public void setRefreshDate(int refreshDate){
        this.bookRefreshDate = refreshDate;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }

    public ReadFinBallDto.Response toReadFinBallDto() {
        return ReadFinBallDto.Response.builder()
                .accountNumber(this.accountNumber)
                .balance(this.balance)
                .moneySource(this.moneySource.toString())
                .usage(this.usage.toString())
                .bookRefreshDate(this.bookRefreshDate)
                .build();
    }
}
