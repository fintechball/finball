package com.example.backend.util;

import com.example.backend.document.question.Quiz;
import com.example.backend.document.question.QuizRepository;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuizSave {

    private final QuizRepository quizRepository;

    static final String JSON_FILE_PATH = "/Users/jeong-yeongbin/Desktop/S09P22E106/backend/backend/src/main/java/com/example/backend/util/json/question.json";

    public void create() throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader(JSON_FILE_PATH);

        JSONObject data = (JSONObject) parser.parse(reader);
        JSONArray quizs = (JSONArray) data.get("questions_and_answers");

        System.out.println(quizs);

        for(int i = 0; i < quizs.size(); i++){
            JSONObject quiz = (JSONObject) quizs.get(i);
            String question = (String) quiz.get("question");
            String answerStr = (String) quiz.get("answer");

            boolean answer = answerStr.equals("네");

            Quiz newQuiz = new Quiz(question, answer);
            quizRepository.save(newQuiz);
        }
    }
}
