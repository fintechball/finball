package com.example.backend.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
  BAD_REQUEST_ERROR1(400, "1번으로 요청했는데, 에러입니다.");

  private final int status;
  private final String message;
}

