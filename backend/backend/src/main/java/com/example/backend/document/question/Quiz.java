package com.example.backend.document.question;

import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quiz")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Quiz {

    @Id
    private String _id;

    private String body;

    private boolean answer;

    public Quiz(String body, boolean answer) {
        this.body = body;
        this.answer = answer;
    }

    public QuizInfoDto toQuizInfoDto() {
        return QuizInfoDto.builder()
                .id(this._id)
                .body(this.body)
                .answer(this.answer)
                .build();
    }
}
