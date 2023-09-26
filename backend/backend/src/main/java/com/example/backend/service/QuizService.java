package com.example.backend.service;

import com.example.backend.document.message.RegistMessageDto;
import com.example.backend.document.message.Message;
import com.example.backend.document.message.MessageDto;
import com.example.backend.document.message.MessageRepository;
import com.example.backend.document.question.Quiz;
import com.example.backend.document.question.QuizInfoDto;
import com.example.backend.document.question.QuizRepository;
import com.example.backend.entity.Member;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final MessageRepository messageRepository;
    private final QuizRepository quizRepository;

    public void save(RegistMessageDto.Request request, Member member) {
        Message message = new Message(request, member);
        messageRepository.save(message);
    }

    public RegistMessageDto.Response getMessage(Member member) {
        List<Message> messageList = messageRepository.findAllByUserIdOrderByCreateAtAsc(
                member.getId());
        List<MessageDto> messageDtoList = new ArrayList<>();
        for (Message message : messageList) {
            messageDtoList.add(message.toResponse());
        }

        return new RegistMessageDto.Response(messageDtoList);
    }

    public List<QuizInfoDto> getRandomFiveQuizzes() {
        // Fetch all Quiz documents from the database
        List<Quiz> allQuizzes = quizRepository.findAll();

        int totalQuizzes = allQuizzes.size();
        int numToSelect = Math.min(totalQuizzes, 5); // Ensure we don't select more than available

        List<QuizInfoDto> randomQuizzes = new ArrayList<>();
        Random random = new Random();

        // Randomly select 5 quizzes
        for (int i = 0; i < numToSelect; i++) {
            int randomIndex = random.nextInt(totalQuizzes);
            Quiz randomQuiz = allQuizzes.get(randomIndex);
            randomQuizzes.add(randomQuiz.toQuizInfoDto());
            allQuizzes.remove(randomIndex); // Avoid selecting the same quiz twice
            totalQuizzes--; // Reduce the total available quizzes
        }

        return randomQuizzes;
    }
}
