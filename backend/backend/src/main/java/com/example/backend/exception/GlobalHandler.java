package com.example.backend.exception;

import com.example.backend.error.ErrorCode;
import com.example.backend.error.ErrorResponse;
import com.example.backend.error.ResponseUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalHandler {

    @ExceptionHandler(CustomException.class)
    private ResponseEntity<ErrorResponse> handleLoginDeniedException(CustomException e) {
        return handleExceptionInternal(e.getErrorCode());
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity<ErrorResponse> handleException(Exception e) {
        return handleExceptionInternal(e, ErrorCode.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ErrorResponse> handleExceptionInternal(Exception e, ErrorCode errorCode) {
        ErrorResponse errorResponse = ErrorResponse.of(errorCode);
        e.printStackTrace();
        return ResponseEntity.status(errorCode.getStatus()).body(errorResponse);
    }

    private ResponseEntity<ErrorResponse> handleExceptionInternal(ErrorCode errorCode) {
        ErrorResponse errorResponse = ErrorResponse.of(errorCode);
        return ResponseEntity.status(errorCode.getStatus()).body(errorResponse);
    }
}