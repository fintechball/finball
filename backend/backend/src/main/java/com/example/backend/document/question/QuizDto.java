package com.example.backend.document.question;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class QuizDto {

    @Data
    @AllArgsConstructor
    public static class Response {
        private List<QuizInfoDto> quizInfoList;
    }
}
