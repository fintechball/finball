package com.example.backend.exception.security;

import org.springframework.http.HttpStatus;

public class JwtTokenInvalidException extends RuntimeException {

    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

    public JwtTokenInvalidException(String message) {
        super(message);
    }
}