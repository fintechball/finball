package com.example.backend.entity;

import com.example.backend.dto.finball.FinancialBookCategoryDto;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private FinBallAccount finBallAccount;

    @Column
    private String name;

    @Column
    private Long value; //최초 금액

    @Column
    private Long balance; //잔액

    @Column
    private LocalDateTime updatedAt; //수정일

    @PreUpdate
    public void updateTimeStamps() {
        updatedAt = LocalDateTime.now();
    }

    public FinancialBookCategoryDto toCategoryDto() {
        int percent = (int) (this.balance / this.value);
        return FinancialBookCategoryDto.builder()
                .id(this.id)
                .name(this.name)
                .value(this.value)
                .balance(this.balance)
                .percent(percent * 100)
                .build();
    }
}
