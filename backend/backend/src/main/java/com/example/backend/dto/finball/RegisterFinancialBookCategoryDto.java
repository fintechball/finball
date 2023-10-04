package com.example.backend.dto.finball;

import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class RegisterFinancialBookCategoryDto {

    @Data
    public static class Request {

        private ArrayList<FinancialBookCategoryDto> categoryList;

        public ArrayList<Category> toCategory(FinBallAccount finBallAccount,
                ArrayList<Category> savedCategories) {

            for (FinancialBookCategoryDto bookCategory : this.categoryList) { //카테고리 요청 정보
                boolean isSameName = false;
                for (int i = 0; i < savedCategories.size(); i++) {
                    //이름이 같다면?
                    if (bookCategory.getName().equals(savedCategories.get(i).getName())) {
                        savedCategories.get(i).addValue(bookCategory.getValue());
                        isSameName = true;
                        break;
                    }
                }

                if (!isSameName) {
                    savedCategories.add(Category.builder()
                            .finBallAccount(finBallAccount)
                            .name(bookCategory.getName())
                            .value(bookCategory.getValue())
                            .usedValue(0L)
                            .build());
                }
            }
            return savedCategories;
        }
    }
}
