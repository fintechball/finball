package com.example.backend.service;

import com.example.backend.document.GptAnswerDto;
import com.example.backend.document.GptAnswerDto.Request;
import com.example.backend.document.GptAnswerDto.Response;
import com.example.backend.document.Message;
import com.example.backend.document.MessageDto;
import com.example.backend.document.MessageRepository;
import com.example.backend.entity.Member;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final MessageRepository messageRepository;

    public void save(Request request, Member member) {
        Message message = new Message(request, member);
        messageRepository.save(message);
    }

    public Response getMessage(Member member) {
        List<Message> messageList = messageRepository.findAllByUserIdOOrderByCreateAtAsc(
                member.getId());
        List<MessageDto> messageDtoList = new ArrayList<>();
        for (Message message : messageList) {
            messageDtoList.add(message.toResponse());
        }

        return new GptAnswerDto.Response(messageDtoList);
    }
}
