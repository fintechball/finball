package com.example.backend.exception.security;

import org.springframework.http.HttpStatus;

public class FromLoginInvalidException extends RuntimeException {

    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

    public FromLoginInvalidException(String message) {
        super(message);
    }
}