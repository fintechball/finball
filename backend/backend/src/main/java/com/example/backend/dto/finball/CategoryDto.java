package com.example.backend.dto.finball;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CategoryDto {
    private Long id;
    private String name;
}
