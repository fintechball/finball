package com.example.backend.dto.finball;

import com.example.backend.entity.Category;
import lombok.Data;

@Data
public class UpdateFinancialBookCategoryDto {

    @Data
    public static class Request {

        private Long id;
        private String name;
        private Long value;

        public Category updateCategory(Category savedCategory) {

            savedCategory.updateEntity(name, value);
            return savedCategory;
        }
    }
}
