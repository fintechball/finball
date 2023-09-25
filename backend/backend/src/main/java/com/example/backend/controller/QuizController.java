package com.example.backend.controller;

import com.example.backend.document.GptAnswerDto;
import com.example.backend.document.Message;
import com.example.backend.document.MessageDto;
import com.example.backend.document.MessageRepository;
import com.example.backend.dto.Response;
import com.example.backend.security.UserDetailsImpl;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class QuizController {

    private final MessageRepository messageRepository;

    @PostMapping("/chat-bot")
    public Response<?> registerChat(@RequestBody GptAnswerDto.Request request,
            @AuthenticationPrincipal
                    UserDetailsImpl userDetails) {
        Message message = new Message(request, userDetails.getMember());
        messageRepository.save(message);

        return new Response(200, "성공적으로 메시지를 저장하였습니다.", null);
    }

    @GetMapping("/chat-bot")
    public Response<GptAnswerDto.Response> getChat(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<Message> messageList = messageRepository.findAllByUserId(
                userDetails.getMember()
                        .getId());
        List<MessageDto> messageDtoList = new ArrayList<>();
        for (Message message : messageList) {
            messageDtoList.add(message.toResponse());
        }

        GptAnswerDto.Response response = new GptAnswerDto.Response(messageDtoList);
        return new Response(200, "성공적으로 메시지를 저장하였습니다.", response);
    }

    @GetMapping("/quiz")
    public void testMongo() {

    }
}
