package com.example.backend.entity;

import com.example.backend.dto.finball.FinBallAccountInfoDto;
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
import javax.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FinBallAccount {

    @Id
    @Column
    private String accountNo;

    @Column
    private Long balance;

    @Column
    private LocalDateTime refreshAt; //거래 갱신일

    @Column
    private LocalDateTime createdAt; //계좌 생성일

    @Column
    private LocalDateTime closedAt; //??

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

    @Column
    @ColumnDefault("false")
    private boolean isTexted;

    //계좌 생성 시 자동으로 createdAt
    @PrePersist
    public void createTimeStamps() {
        createdAt = LocalDateTime.now();
    }

    public void setBookRefreshDate(int bookRefreshDate) {
        this.bookRefreshDate = bookRefreshDate;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }

    public ReadFinBallDto.Response toReadFinBallDto() {
        return ReadFinBallDto.Response.builder()
                .account(FinBallAccountInfoDto.builder()
                        .no(this.accountNo)
                        .balance(this.balance)
                        .bookRefreshDate(this.bookRefreshDate)
                        .createdAt(this.createdAt.toLocalDate())
                        .moneySource(this.moneySource)
                        .usage(this.usage)
                        .build()).build();
    }
}
