package com.example.backend.security.jwt;

import java.util.NoSuchElementException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

// 토큰값 가져와서 Bearer 때주면서 예외처리까지 ㅎㅅㅎ
@Component
public class HeaderTokenExtractor {

    /*
     * HEADER_PREFIX
     * header Authorization token 값의 표준이되는 변수
     */
    public final String HEADER_PREFIX = "Bearer ";

    public String extract(String header, HttpServletRequest request) {
        System.out.println("HeaderTokenExtractor : extract");

        if (header == null || header.length() < HEADER_PREFIX.length()) {
            System.out.println("error request : " + request.getRequestURI());
            throw new NoSuchElementException("올바른 JWT 정보가 아닙니다.");
        }

        return header.substring(
                HEADER_PREFIX.length(),
                header.length()
        );
    }

}
