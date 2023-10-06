package com.example.backend.entity;

import com.example.backend.dto.groupaccount.GroupAccountDto;
import com.example.backend.dto.groupaccount.GroupAccountListDto;
import com.example.backend.type.GameType;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class GroupAccount {

    @Id
    @Column
    private String accountNo;

    @Column
    private Long balance;

    @Column
    private LocalDateTime refreshAt;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime closedAt;

    @Column
    private String name;

    @Column
    private String originNo;

    @Column
    @Enumerated(EnumType.STRING)
    private GameType gameType;

    @Column
    private boolean valid;

    @Column
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Builder
    public GroupAccount(String accountNo, LocalDateTime refreshAt, String name, String originNo,
            GameType gameType, long balance, boolean valid,
            String url, Member member) {
        this.accountNo = accountNo;
        this.refreshAt = refreshAt;
        this.name = name;
        this.originNo = originNo;
        this.gameType = gameType;
        this.balance = balance;
        this.valid = valid;
        this.url = url;
        this.member = member;
    }

    public GroupAccountListDto togroupAccountListDto() {
        return GroupAccountListDto.builder()
                .groupAccountNo(this.accountNo)
                .name(this.name)
                .balance(this.balance)
                .build();
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }

    public GroupAccountDto.Response toGroupAccountResponseDto() {
        return GroupAccountDto.Response.builder()
                .accountNo(this.accountNo)
                .name(this.name)
                .build();
    }
}
