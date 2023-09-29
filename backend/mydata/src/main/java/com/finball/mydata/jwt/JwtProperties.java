package com.finball.mydata.jwt;

public interface JwtProperties {

    String SECRET = "finball";
    int SEC = 1;
    int MINUTE = SEC * 60;
    int HOUR = MINUTE * 60;
    int DAY = 24 * HOUR;
    int EXPIRATION_TIME = 60 * DAY * 1000;
//    int EXPIRATION_TIME = 600000000 * 10; // 10일
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
