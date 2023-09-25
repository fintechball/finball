package com.finball.mydata.entity;

import com.finball.mydata.dto.account.AccountDto;
import com.finball.mydata.dto.account.BankAccountDto;
import javax.persistence.Column;
import javax.persistence.JoinColumn;

import com.finball.mydata.dto.account.OppositeAccountDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {

    @Id
    private String accountNo;

    @Column
    private String originNo;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="company_code")
    private Company company;

    private Long balance;

    private String name;

    private LocalDateTime createdAt;

    private LocalDateTime closedAt;

    public void setBalance(Long balance) {
        this.balance = balance;
    }

    @Builder
    public Account(String accountNo, String originNo, Member member, Company company, Long balance, String name,
                   LocalDateTime createdAt, LocalDateTime closedAt) {
        this.accountNo = accountNo;
        this.originNo = originNo;
        this.member = member;
        this.company = company;
        this.balance = balance;
        this.name = name;
        this.createdAt = createdAt;
        this.closedAt = closedAt;
    }

    public AccountDto toAccountDto() {
        return AccountDto.builder()
                .name(this.name)
                .no(this.accountNo)
                .createdAt(this.createdAt)
                .closedAt(this.closedAt)
                .balance(this.balance)
                .build();
    }

    public BankAccountDto toBankAccountDto() {

        return BankAccountDto.builder()
                .company(this.company.toCompanyDto())
                .account(this.toAccountDto())
                .build();
    }

    public OppositeAccountDto toOppositeAccountDto() {
        return OppositeAccountDto.builder()
                .company(this.company.toCompanyDto())
                .accountNo(this.getAccountNo())
                .name(this.member.getName())
                .build();
    }
}
