package com.example.backend.exception.security;

import org.springframework.http.HttpStatus;

public class JwtTokenExpiredException extends RuntimeException {

    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

    public JwtTokenExpiredException(String message) {
        super(message);
    }
}