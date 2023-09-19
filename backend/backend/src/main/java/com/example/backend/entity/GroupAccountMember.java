package com.example.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class GroupAccountMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String toAccountNumber;

    @Column
    private Long value;

    @Column
    private Long balance;

    @Column
    private String bankName;

    @Column
    private long skinId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private GroupAccount groupAccount;

    @Builder
    public GroupAccountMember(String toAccountNumber, Long value, Long balance, String bankName, long skinId,
            Member member,
            GroupAccount groupAccount) {
        this.toAccountNumber = toAccountNumber;
        this.value = value;
        this.balance = balance;
        this.bankName = bankName;
        this.skinId = skinId;
        this.member = member;
        this.groupAccount = groupAccount;
    }

    @Override
    public String toString() {
        return "GroupAccountMember{" +
                "id=" + id +
                ", toAccountNumber='" + toAccountNumber + '\'' +
                '}';
    }
}
