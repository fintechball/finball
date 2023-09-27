package com.example.backend.entity;

import com.example.backend.dto.finball.CompanyDto;
import com.example.backend.dto.finball.OppositeDto;
import com.example.backend.dto.groupaccount.GroupGameResultDto;
import com.example.backend.dto.groupaccount.GroupTradeHistoryDto;
import com.example.backend.type.DealType;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;

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
    private LocalDateTime date = LocalDateTime.now();

    @Column
    @Enumerated(EnumType.STRING)
    private DealType dealType;

    @Column
    private String target;  // 상대방 이름

    @Column
    private String opAccountNo;

    @Column
    private String opBankCpLogo;

    @Column
    private String opBankCpName;

    @Column
    private Long opBankCpCode;

    @ManyToOne(fetch = FetchType.LAZY)
    private GroupAccount groupAccount;

    @OneToMany(mappedBy = "groupAccountHistory")
    private List<GroupGameResult> games = new ArrayList<GroupGameResult>();
    
    public GroupTradeHistoryDto toGroupTradeHistoryDto() {
        List<GroupGameResultDto> games = this.games.stream()
                .map(GroupGameResult::toGroupGameResultDto).collect(
                        Collectors.toList());
        CompanyDto companyDto = CompanyDto.builder()
                .code(this.opBankCpCode)
                .name(this.opBankCpName)
                .logo(this.opBankCpLogo)
                .build();
        OppositeDto opposite = OppositeDto.builder()
                .accountNo(this.opAccountNo)
                .userName(this.target)
                .company(companyDto).build();


        return GroupTradeHistoryDto.builder()
                .id(this.id)
                .balance(this.balance)
                .value(this.value)
                .date(this.date.toLocalDate())
                .time(this.date.toLocalTime())
                .type(this.dealType)
                .opposite(opposite)
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
