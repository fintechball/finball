package com.example.backend.exception.security;

import org.springframework.http.HttpStatus;

public class FromLoginBadRequestException extends RuntimeException {

    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

    public FromLoginBadRequestException(String message) {
        super(message);
    }
}
