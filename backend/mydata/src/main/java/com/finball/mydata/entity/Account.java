package com.finball.mydata.entity;

import com.finball.mydata.dto.account.AccountDto;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {

    @Id
    private String accountNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    private Long balance;

    private String name;

    private LocalDateTime accountRegist;

    private LocalDateTime accountClose;

    @Builder
    public Account(String accountNo, Member member, Company company, Long balance, String name,
            LocalDateTime accountRegist, LocalDateTime accountClose) {
        this.accountNo = accountNo;
        this.member = member;
        this.company = company;
        this.balance = balance;
        this.name = name;
        this.accountRegist = accountRegist;
        this.accountClose = accountClose;
    }

    public AccountDto toDto() {
        return AccountDto.builder()
                .account(this.accountNo)
                .bankName(this.company.getCpName())
                .bankImage(this.company.getCpLogo())
                .name(this.name)
                .balance(this.balance)
                .build();
    }
}
