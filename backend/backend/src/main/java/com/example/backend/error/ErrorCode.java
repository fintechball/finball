package com.example.backend.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    ALREADY_IN_USE(409, "이미 데이터가 존재합니다."),
    INTERNAL_SERVER_ERROR(500, "서버 에러입니다"),
    DATA_NOT_FOUND(400, "해당 데이터가 없습니다"),
    OUT_OF_RANGE(400, "지정된 범위를 초과했습니다."),
    DELETE_CATEGORY_REFUSED(400, "선택한 가계부 카테고리를 이미 사용했습니다. 다음 가계부 갱신일에 삭제해주세요.");



    private final int status;
    private final String message;
}