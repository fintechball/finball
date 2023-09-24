package com.example.backend.entity;

import com.example.backend.dto.finball.CompanyDto;
import com.example.backend.dto.finball.FinBallTradeHistoryDto;
import com.example.backend.dto.finball.OppositeDto;
import com.example.backend.type.DealType;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class FinBallHistory {

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
    private FinBallAccount finBallAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    public FinBallTradeHistoryDto toFinBallHistoryDto() {
        return FinBallTradeHistoryDto.builder()
                .id(this.id)
                .value(this.value)
                .date(this.date.toLocalDate())
                .time(this.date.toLocalTime())
                .type(this.dealType)
                .balance(this.balance)
                .opposite(OppositeDto.builder()
                        .userName(this.target)
                        .accountNo(this.opAccountNo)
                        .company(CompanyDto.builder()
                                .code(this.opBankCpCode)
                                .name(this.opBankCpName)
                                .logo(this.opBankCpLogo)
                                .build())
                        .build())
                .build();
    }
}
