package com.example.backend.dto.finball;

import com.example.backend.entity.Category;
import java.util.ArrayList;
import lombok.Data;

@Data
public class FinancialBookDto {

    @Data
    public static class Response {

        private Long value;     //가계부 value 합
        private Long usedValue; //가계부 총 사용 금액
        private Long balance;   //가계부 잔고
        private ArrayList<FinancialBookCategoryDto> category;
        private Integer refreshDate; //가계부 갱신일 (1일)

        public Response(ArrayList<Category> categories) {
            ArrayList<FinancialBookCategoryDto> category = new ArrayList<>();
            Long value = 0L;
            Long usedValue = 0L;
            Long balance = 0L;

            for (Category categoryEntity : categories) {
                category.add(categoryEntity.toCategoryDto());

                value += categoryEntity.getValue();
                usedValue += categoryEntity.getUsedValue();
                balance += categoryEntity.getBalance();
            }

            this.value = value;
            this.usedValue = usedValue;
            this.balance = balance;
            this.category = category;
        }
    }

}
