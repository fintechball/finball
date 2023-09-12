package com.example.backend.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.backend.exception.security.JwtTokenExpiredException;
import com.example.backend.exception.security.JwtTokenInvalidException;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtDecoder {

    private final JwtTokenUtils jwtTokenUtils;

    public String decodeUsername(String token) {
        System.out.println("JwtDecoder : decodeUsername");
        DecodedJWT decodedJWT = isValidToken(token);

        Date expireDate = decodedJWT.getClaim(jwtTokenUtils.CLAIM_EXPIRED_DATE).asDate();
        Date now = new Date();

        if (expireDate.before(now)) {
            throw new JwtTokenExpiredException("토큰 만료");
        }

        return decodedJWT.getClaim(jwtTokenUtils.CLAIM_USER_NAME).asString();
    }

    public long getExpireTime(String refreshToken) {
        DecodedJWT decodedJWT = isValidToken(refreshToken);
        return decodedJWT.getClaim(jwtTokenUtils.CLAIM_EXPIRED_DATE).asLong() * 1000;
    }


    DecodedJWT isValidToken(String token) {
        System.out.println("JwtDecoder : isValidToken");
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtTokenUtils.JWT_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        } catch (Exception e) {
            throw new JwtTokenInvalidException("토큰 유효성 검사 실패");
        }
    }
}