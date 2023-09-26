package com.example.backend.controller;

import com.example.backend.document.EventDoc;
import com.example.backend.document.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class QuizController {

    private final EventRepository eventRepository;

    @GetMapping("/quiz")
    public void testMongo() {
        EventDoc eventDoc = new EventDoc();
        eventDoc.setTitle("아몰랑");
        eventDoc.setImage("이미지");

        eventRepository.save(eventDoc);
    }
}
