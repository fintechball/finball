package com.finball.mydata.service;

import com.finball.mydata.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CardService {
    private final CardRepository cardRepository;
}
