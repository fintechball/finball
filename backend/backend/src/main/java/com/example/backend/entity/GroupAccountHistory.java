package com.example.backend.entity;

import com.example.backend.dto.groupaccount.GroupGameResultDto;
import com.example.backend.dto.groupaccount.GroupTradeHistoryDto;
import com.example.backend.type.DealType;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class GroupAccountHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long value;

    @Column
    private Long balance;

    @Column
    private LocalDateTime dealDt = LocalDateTime.now();

    @Column
    @Enumerated(EnumType.STRING)
    private DealType dealType;

    @Column
    private String target;

    @Column
    private String nickname;

    @Column
    private String opAccount;

    @Column
    private String opBankName;

    @ManyToOne
    private GroupAccount groupAccount;

    @OneToMany(mappedBy = "groupAccountHistory")
    private List<GroupGameResult> games = new ArrayList<GroupGameResult>();

    public GroupTradeHistoryDto toGroupTradeHistoryDto() {
        List<GroupGameResultDto> games = this.games.stream()
                .map(GroupGameResult::toGroupGameResultDto).collect(
                        Collectors.toList());
        return GroupTradeHistoryDto.builder()
                .id(this.id)
                .name(this.target)
                .value(this.value)
                .type(this.dealType)
                .result(games)
                .build();
    }

    @Override
    public String toString() {
        return "GroupAccountHistory{" +
                "id=" + id +
                ", games=" + games +
                '}';
    }
}
