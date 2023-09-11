package com.example.backend.entity;

import com.example.backend.type.MoneySource;
import com.example.backend.type.Usage;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
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
    private Usage usage;

    @Column
    private MoneySource moneySource;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

}
