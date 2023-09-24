package com.finball.mydata.entity;

import com.finball.mydata.dto.account.BankAccountDto;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {

    @Id
    private String accountNo;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    private Long balance;

    private String name;

    private LocalDateTime createdAt;

    private LocalDateTime closedAt;

    public void setBalance(Long balance) {
        this.balance = balance;
    }

    @Builder
    public Account(String accountNo, Member member, Company company, Long balance, String name,
                   LocalDateTime createdAt, LocalDateTime closedAt) {
        this.accountNo = accountNo;
        this.member = member;
        this.company = company;
        this.balance = balance;
        this.name = name;
        this.createdAt = createdAt;
        this.closedAt = closedAt;
    }

    public BankAccountDto toAccountDto() {
        return BankAccountDto.builder()
                .accountNumber(this.accountNo)
                .bankName(this.company.getCpName())
                .bankImage(this.company.getCpLogo())
                .accountName(this.name)
                .accountRegist(this.createdAt)
                .accountClose(this.closedAt)
//                .bankCode(this.company.getCpCode())
                .build();
    }
}
