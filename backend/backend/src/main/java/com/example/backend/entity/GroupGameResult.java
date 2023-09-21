package com.example.backend.entity;

import com.example.backend.dto.groupaccount.GroupGameResultDto;
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
public class GroupGameResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long lose;

    @ManyToOne(fetch = FetchType.LAZY)
    private GroupAccountHistory groupAccountHistory;

    @ManyToOne(fetch = FetchType.LAZY)
    private GroupAccountMember groupAccountMember;


    public GroupGameResultDto toGroupGameResultDto() {
        return GroupGameResultDto.builder()
                .value(this.lose)
                .name(this.groupAccountMember.getMember().getName())
                .build();
    }

    @Builder
    public GroupGameResult(long lose, GroupAccountHistory groupAccountHistory,
            GroupAccountMember groupAccountMember) {
        this.lose = lose;
        this.groupAccountHistory = groupAccountHistory;
        this.groupAccountMember = groupAccountMember;
    }
}
