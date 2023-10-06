package com.example.backend.dto.finball;

import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import java.util.ArrayList;
import lombok.Data;

@Data
public class DeleteFinancialBookCategoryDto {

    @Data
    public static class Request {

        private ArrayList<Long> categoryList;

        public ArrayList<Category> deleteCategory(ArrayList<Category> savedCategoryList,
                FinBallAccount account) {

            ArrayList<Category> deleteCategoryList = new ArrayList<>();

            for (Category category : savedCategoryList) {
                if (categoryList.contains(category.getId())) {
                    if (category.getUsedValue() != 0) {
                        throw new CustomException(ErrorCode.DELETE_CATEGORY_REFUSED);
                    }
                    deleteCategoryList.add(category);
                }
            }
            return deleteCategoryList;
        }
    }
}
