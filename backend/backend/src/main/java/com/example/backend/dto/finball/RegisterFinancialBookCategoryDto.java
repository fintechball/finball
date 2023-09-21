package com.example.backend.dto.finball;

import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import java.util.ArrayList;
import lombok.Data;

@Data
public class RegisterFinancialBookCategoryDto {

    @Data
    public static class Request {

        private ArrayList<FinancialBookCategoryDto> category;

        public ArrayList<Category> toCategory(FinBallAccount finBallAccount) {

            ArrayList<Category> list = new ArrayList<>();

            for (FinancialBookCategoryDto bookCategory : this.category) { //카테고리 요청 정보
                list.add(Category.builder()
                        .finBallAccount(finBallAccount)
                        .name(bookCategory.getName())
                        .value(bookCategory.getValue())
                        .usedValue(0L)
                        .build());
            }

            return list;
        }
    }
}
