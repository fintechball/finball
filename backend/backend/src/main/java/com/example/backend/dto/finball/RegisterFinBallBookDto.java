package com.example.backend.dto.finball;

import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import java.util.ArrayList;
import lombok.Data;

@Data
public class RegisterFinBallBookDto {

    @Data
    public static class Request {

        private ArrayList<FinancialBookCategoryDto> categoryList;
        private int refreshDate;

        public ArrayList<Category> toCategory(FinBallAccount finBallAccount) {

            ArrayList<Category> list = new ArrayList<>();

            for (FinancialBookCategoryDto bookCategory : this.categoryList) { //카테고리 요청 정보
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
