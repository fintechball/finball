package com.example.backend.exception;

import com.example.backend.error.ErrorCode;

public class CustomException extends RuntimeException{
  private ErrorCode errorCode;

  public CustomException(ErrorCode errorCode){
    super(errorCode.getMessage());
    this.errorCode = errorCode;
  }
}
