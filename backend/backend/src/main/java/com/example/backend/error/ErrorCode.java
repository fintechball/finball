package com.example.backend.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    GROUP_ACCOUNT_NOT_FOUND(500, "그룹 계좌가 존재하지 않습니다."),
    GROUP_ACCOUNT_HISTORY_NOT_FOUND(500, "그룹 계좌 거래 내역이 존재하지 않습니다."),
    GROUP_ACCOUNT_MEMBER_NOT_FOUND(500, "그룹 멤버가 존재하지 않습니다."),
    ACCOUNT_NOT_FOUND(500, "통장이 존재하지 않습니다."),
    ACCOUNT_NOT_VALID(400, "만료된 통장입니다"),
    ALREADY_IN_USE(409, "이미 데이터가 존재합니다."),
    INTERNAL_SERVER_ERROR(500, "서버 에러입니다"),
    DATA_NOT_FOUND(400, "해당 데이터가 없습니다"),
    OUT_OF_RANGE(400, "지정된 범위를 초과했습니다."),
    DELETE_CATEGORY_REFUSED(400, "선택한 가계부 카테고리를 이미 사용했습니다. 다음 가계부 갱신일에 삭제해주세요."),
    OWNER_NOT_CORRESPOND(400, "주인이 아닙니다."),
    DUPLICATE_USER_ID(400, "중복된 아이디입니다."),
    LACK_OF_POINT(400, "포인트가 부족합니다."),
    NOT_WITHDRAW_ERROR(400, "출금에서만 가능한 기능입니다."),

    // JWT
    JWT_TOKEN_INVALID_VALUE(401, "jwt 토큰 값이 비정상적 입니다."),
    JWT_TOKEN_EXPIRED(401, "jwt 만료가 되었습니다."),
    FORM_LOGIN_BAD_REQUEST(401, "로그인을 요청 데이터형식이 잘못되었습니다."),
    FORM_LOGIN_INVALID(401, "로그인 정보가 잘못되었습니다."),
    NOT_SAME_DATA_VALUE(401, "해당 유저가 존재하지 않습니다."),

    // SMS
    PHONE_NUMBER_EXIST(400, "해당 휴대폰번호는 이미가입한 회원입니다."),

    // 사용자
    EASY_PASSWORD_NO_SUCH_ELEMENT(401, "간편 결제 인증에 실패했습니다."),
    EASY_PASSWORD_INVALID(400, "간편 결제 번호는 6글자이어야 합니다.");


    private final int status;
    private final String message;
}