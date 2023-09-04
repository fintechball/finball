package com.example.backend.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonInclude(Include.NON_NULL)
public class ErrorResponse {
  private int status;
  private String message;

  @Builder
  protected ErrorResponse(ErrorCode code){
    this.status = code.getStatus();
    this.message = code.getMessage();
  }

  public static ErrorResponse of(final ErrorCode code){
    return new ErrorResponse(code);
  }
}
