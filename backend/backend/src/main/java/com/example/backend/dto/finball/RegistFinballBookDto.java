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

        private Long value; //가계부에 넣을 돈
        private ArrayList<FinancialBookCategoryDto> category;

        public ArrayList<Category> toCategory(FinBallAccount finBallAccount) {
            long valueSum = 0L;

            ArrayList<Category> list = new ArrayList<>();
            for (FinancialBookCategoryDto bookCategory : this.category) {
                valueSum += bookCategory.getValue();
                list.add(Category.builder()
                        .finBallAccount(finBallAccount)
                        .name(bookCategory.getName())
                        .value(bookCategory.getValue())
                        .balance(bookCategory.getValue())
                        .updatedAt(LocalDateTime.now())
                        .build());
            }

            if (valueSum > this.value) {
                throw new CustomException(ErrorCode.OUT_OF_RANGE);
            }

            list.add(Category.builder()
                    .finBallAccount(finBallAccount)
                    .name("기타")
                    .value(this.value - valueSum)
                    .balance(this.value - valueSum)
                    .updatedAt(LocalDateTime.now())
                    .build());

            return list;
        }
    }
}
