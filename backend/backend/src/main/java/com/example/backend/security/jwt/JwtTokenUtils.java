package com.example.backend.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.backend.config.redis.RedisDao;
import com.example.backend.dto.TokenDto;
import com.example.backend.repository.member.MemberRepository;
import com.example.backend.security.UserDetailsImpl;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtTokenUtils {

    private final MemberRepository memberRepository;
    private final RedisDao redisDao;

    @Value("${spring.auth.secret.key}")
    String JWT_SECRET;

    private int SEC = 1;
    private int MINUTE = SEC * 60;
    private int HOUR = MINUTE * 60;
    private int DAY = 24 * HOUR;

    private int ACCESS_TOKEN_VALID_MILLI_SEC = 12 * HOUR * 1000;
    private int REFRESH_TOKEN_VALID_MILLI_SEC = 60 * DAY * 1000;


    final String CLAIM_EXPIRED_DATE = "EXPIRED_DATE";
    final String CLAIM_USER_NAME = "USER_NAME";
    final String ACCESS_TOKEN = "ACCESS_TOKEN";
    final String REFRESH_TOKEN = "REFRESH_TOKEN";
    final String TOKEN_HEADER = "Bearer ";
    final String ISSUER = "finBall";

    public Map<String, String> generatedJwtToken(UserDetailsImpl userDetails) {
        System.out.println("JwtTokenUtils : generatedJwtToken");

        Map<String, String> map = new HashMap<>();

        String accessToken = JWT.create()
                .withIssuer(ISSUER)
                .withClaim(CLAIM_USER_NAME, userDetails.getUsername())
                .withClaim(CLAIM_EXPIRED_DATE,
                        new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALID_MILLI_SEC))
                .sign(Algorithm.HMAC256(JWT_SECRET));

        String refreshToken = JWT.create()
                .withIssuer(ISSUER)
                .withClaim(CLAIM_USER_NAME, userDetails.getUsername())
                .withClaim(CLAIM_EXPIRED_DATE,
                        new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALID_MILLI_SEC))
                .sign(Algorithm.HMAC256(JWT_SECRET));

        map.put(ACCESS_TOKEN, accessToken);
        map.put(REFRESH_TOKEN, refreshToken);

        redisDao.deleteValues(userDetails.getUsername()); // 기존에 있던 리프레쉬 토큰 삭제
        redisDao.setValues(userDetails.getUsername(), refreshToken,
                Duration.ofMillis(REFRESH_TOKEN_VALID_MILLI_SEC)); // 새로운 리프레쉬 토큰 저장

        return map;

    }

    public TokenDto.Response reissueToken(String userId, String userRefreshToken)
            throws IllegalAccessException {

        String redisRefreshToken = redisDao.getValues(userId);

        if (redisRefreshToken == null) {
            throw new IllegalAccessException("refreshToken이 존재하지 않습니다. 다시 로그인하세요");
        }

        if (!redisRefreshToken.equals(userRefreshToken)) {
            throw new IllegalAccessException("refreshToken이 일치하지 않습니다. 다시 로그인하세요");
        }

        String accessToken = JWT.create()
                .withIssuer(ISSUER)
                .withClaim(CLAIM_USER_NAME, userId)
                .withClaim(CLAIM_EXPIRED_DATE,
                        new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALID_MILLI_SEC))
                .sign(Algorithm.HMAC256(JWT_SECRET));

        String refreshToken = JWT.create()
                .withIssuer(ISSUER)
                .withClaim(CLAIM_USER_NAME, userId)
                .withClaim(CLAIM_EXPIRED_DATE,
                        new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALID_MILLI_SEC))
                .sign(Algorithm.HMAC256(JWT_SECRET));

        redisDao.deleteValues(userId); // 기존에 있던 리프레쉬 토큰 삭제
        redisDao.setValues(userId, refreshToken,
                Duration.ofMillis(REFRESH_TOKEN_VALID_MILLI_SEC)); // 새로운 리프레쉬 토큰 저장

        TokenDto.Response response = new TokenDto.Response(TOKEN_HEADER + accessToken, TOKEN_HEADER + refreshToken);

        return response;
    }


    public void logout(String userId) {
        redisDao.deleteValues(userId); // 리프레쉬 토큰 삭제
    }
}
