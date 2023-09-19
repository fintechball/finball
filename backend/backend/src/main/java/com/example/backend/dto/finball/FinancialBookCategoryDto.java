package com.example.backend.dto.finball;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Builder;
import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
@Builder
public class FinancialBookCategoryDto {

    private Long id;
    private String name;
    private Long value;
    private Long balance;
    private int percent;

}
