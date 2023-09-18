package com.example.backend.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    ALREADY_IN_USE(409, "이미 데이터가 존재합니다."),
    INTERNAL_SERVER_ERROR(500, "서버 에러입니다");


    private final int status;
    private final String message;
}