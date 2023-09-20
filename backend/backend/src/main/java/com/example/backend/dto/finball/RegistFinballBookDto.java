package com.example.backend.dto.finball;

import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import lombok.Data;

@Data
public class RegistFinballBookDto {

    @Data
    public static class Request {

        private ArrayList<FinancialBookCategoryDto> category;
        private int refreshDate;

        public ArrayList<Category> toCategory(FinBallAccount finBallAccount) {
            long valueSum = 0L; //카테고리 value 총합(기타도 포함되어 있음)
            ArrayList<Category> list = new ArrayList<>();

            for (FinancialBookCategoryDto bookCategory : this.category) { //카테고리 요청 정보
                valueSum += bookCategory.getValue();

                list.add(Category.builder()
                        .finBallAccount(finBallAccount)
                        .name(bookCategory.getName())
                        .value(bookCategory.getValue())
                        .usedValue(0L)
                        .build());
            }

            if (valueSum > finBallAccount.getBalance()) {
                throw new CustomException(ErrorCode.OUT_OF_RANGE);
            }

            return list;
        }
    }
}
