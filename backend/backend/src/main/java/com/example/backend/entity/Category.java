package com.example.backend.entity;

import com.example.backend.dto.finball.FinancialBookCategoryDto;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
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
    private Long value; //사용할 금액

    @Column
    private Long usedValue; //사용금액

    public FinancialBookCategoryDto toCategoryDto() {
        Long balance = getBalance();

        double percent = (double) balance / this.value;

        return FinancialBookCategoryDto.builder()
                .id(this.id)
                .name(this.name)
                .value(this.value)
                .usedValue(this.usedValue)
                .balance(balance)
                .percent((int)(percent * 100))
                .build();
    }

    public Long getBalance() {
        return this.value - this.usedValue;
    }

    public void updateEntity(String name, Long value) {
        this.name = name;
        this.value = value;
    }

    public void plusUsedValue(Long usedValue) {
        this.usedValue += usedValue;
    }

    public void minusUsedValue(Long usedValue) {
//        if(this.usedValue - usedValue < 0){
//            throw new CustomException(ErrorCode.OUT_OF_RANGE);
//        }
        this.usedValue -= usedValue;
    }

    public void addValue(Long value){
        this.value += value;
    }
}
