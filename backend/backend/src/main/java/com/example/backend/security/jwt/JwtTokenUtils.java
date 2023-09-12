package com.example.backend.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.backend.entity.Member;
import com.example.backend.repository.member.MemberRepository;
import com.example.backend.security.UserDetailsImpl;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtTokenUtils {

    private final MemberRepository memberRepository;

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

    public Map<String, String> generatedJwtToken(UserDetailsImpl userDetails) {
        System.out.println("JwtTokenUtils : generatedJwtToken");

        Map<String, String> map = new HashMap<>();

        String accessToken = JWT.create()
                .withIssuer("finball")
                .withClaim(CLAIM_USER_NAME, userDetails.getUsername())
                .withClaim(CLAIM_EXPIRED_DATE,
                        new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALID_MILLI_SEC))
                .sign(Algorithm.HMAC256(JWT_SECRET));

        String refreshToken = JWT.create()
                .withIssuer("finball")
                .withClaim(CLAIM_USER_NAME, userDetails.getUsername())
                .withClaim(CLAIM_EXPIRED_DATE,
                        new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALID_MILLI_SEC))
                .sign(Algorithm.HMAC256(JWT_SECRET));

        map.put(ACCESS_TOKEN, accessToken);
        map.put(REFRESH_TOKEN, refreshToken);

        /*
            redis에 토큰 저장하는 로직 추가해줘야됨
         */
        return map;

    }


}
