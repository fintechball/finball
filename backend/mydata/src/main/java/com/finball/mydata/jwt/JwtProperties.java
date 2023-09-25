package com.finball.mydata.jwt;

public interface JwtProperties {

    String SECRET = "finball";
    int EXPIRATION_TIME = 600000000 * 10; // 10일
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
