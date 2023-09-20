package com.example.backend.dto.finball;

import java.time.LocalDateTime;
import java.util.ArrayList;
import lombok.Data;

@Data
public class FinancialBookDto {

    @Data
    public static class Response {

        private Long balance; //가계부 잔고
        private ArrayList<FinancialBookCategoryDto> category = new ArrayList<>();

        public void setBalance() {
            Long balance = 0L;

            for (FinancialBookCategoryDto category : this.category) {
                balance += category.getBalance();
            }

            this.balance = balance;
        }
    }

}
