package com.example.backend.controller;

import com.example.backend.document.RegistMessageDto;
import com.example.backend.dto.Response;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.QuizService;
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

    private final QuizService quizService;

    @PostMapping("/message")
    public Response<?> registerChat(@RequestBody RegistMessageDto.Request request,
            @AuthenticationPrincipal
            UserDetailsImpl userDetails) {
        quizService.save(request, userDetails.getMember());

        return new Response(200, "성공적으로 메시지를 저장하였습니다.", null);
    }

    @GetMapping("/message")
    public Response<RegistMessageDto.Response> getChat(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        RegistMessageDto.Response response = quizService.getMessage(userDetails.getMember());
        return new Response(200, "성공적으로 메시지를 저장하였습니다.", response);
    }
}
