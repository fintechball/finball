package com.example.backend.service;

import com.example.backend.document.RegistMessageDto;
import com.example.backend.document.RegistMessageDto.Request;
import com.example.backend.document.RegistMessageDto.Response;
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
}
