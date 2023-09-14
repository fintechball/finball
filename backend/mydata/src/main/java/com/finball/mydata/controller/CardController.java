package com.finball.mydata.controller;

import com.finball.mydata.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CardController {

    private final CardService cardService;

    @GetMapping("/create/card/{memberId}")
    public void createCard(@PathVariable Long memberId) throws Exception {
        cardService.createCard(memberId);
    }
}
