package com.finball.mydata.service;

import com.finball.mydata.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final AccountRepository accountRepository;
}
