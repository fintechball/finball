package com.example.backend.entity;

import com.example.backend.dto.groupaccount.GroupMemberDto;
import com.example.backend.type.HostType;
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

    public void setBalance(long balance) {
        this.balance = balance;
    }

    @Builder
    public GroupAccountMember(String toAccountNumber, Long value, Long balance, String bankName,
            long skinId,
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

    public GroupMemberDto toGroupMemberDto(long hostId) {
        HostType type = HostType.NORMAL;
        if (hostId == this.member.getId()) {
            type = HostType.HOST;
        }
        long totalSum = this.value;
        if (totalSum == 0) {
            totalSum = 1;
        }
        long percent = balance * 100 / totalSum;
        String profileImage = this.member.getProfileImg();
        String name = this.member.getName();
        return GroupMemberDto.builder()
                .percent(percent)
                .value(this.value)
                .balance(this.balance)
                .name(name)
                .profileImage(profileImage)
                .type(type)
                .skinId(this.skinId)
                .build();
    }
}
