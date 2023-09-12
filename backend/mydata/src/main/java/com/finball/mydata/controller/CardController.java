package com.finball.mydata.controller;

import com.finball.mydata.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CardController {
    private final CardService cardService;
}
