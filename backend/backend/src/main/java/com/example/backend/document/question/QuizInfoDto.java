package com.example.backend.document.question;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuizInfoDto {
    private String id;
    private String body;
    private boolean answer;
}
