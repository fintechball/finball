package com.example.backend.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    GROUP_ACCOUNT_NOT_FOUND(500, "그룹 계좌가 존재하지 않습니다."),
    ALREADY_IN_USE(409, "이미 데이터가 존재합니다."),
    INTERNAL_SERVER_ERROR(500, "서버 에러입니다");


    private final int status;
    private final String message;
}