package com.example.backend.dto.finball;

import com.example.backend.entity.Category;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import java.util.ArrayList;
import lombok.Data;

@Data
public class UpdateFinancialBookCategoryDto {

    @Data
    public static class Request {

        private Long id;
        private String name;
        private Long value;

        public ArrayList<Category> updateCategory(ArrayList<Category> savedCategoryList) {

            for (int i = 0; i < savedCategoryList.size(); i++) {
                if (savedCategoryList.get(i).getName().equals(this.name)
                        && savedCategoryList.get(i).getId() != this.id) {
                    throw new CustomException(ErrorCode.ALREADY_IN_USE);
                }

                if (savedCategoryList.get(i).getId() == this.id) {
                    savedCategoryList.get(i).updateEntity(this.name, this.value);
                }
            }

            return savedCategoryList;
        }
    }
}
