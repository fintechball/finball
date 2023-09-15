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

    @ExceptionHandler(CustomException.class) //CustomException 에러를 잡아줌
    protected ResponseEntity<ErrorResponse> handleTest(CustomException ex) {
        log.error("hello" + ex.toString());
        return ResponseUtil.createErrorResponse(ErrorCode.BAD_REQUEST_ERROR1);
    }

}
