package com.example.backend.security.filter;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// 로그인 요청이 들어오면 여기서 받아줌

public class FormLoginFilter extends UsernamePasswordAuthenticationFilter {

    private final ObjectMapper objectMapper;

    public FormLoginFilter (AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
        this.objectMapper = new ObjectMapper().configure(
                DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false
        );
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
            HttpServletResponse response) throws AuthenticationException {
        System.out.println("FormLoginFilter : attemptAuthentication");

        UsernamePasswordAuthenticationToken authRequest = null;

        try {
            // Json으로 변경
            JsonNode requestBody = objectMapper.readTree(request.getInputStream());

            String username = requestBody.get("username").asText();
            String password = requestBody.get("password").asText();

            System.out.println(password);

            authRequest = new UsernamePasswordAuthenticationToken(username, password);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 새로운 인증 객체에 기존 details를 바인딩한다.
        setDetails(request, authRequest);

        // 생성된 토큰을 Manager에게 넘겨줘서 인증 절차 진행하게 됨
        return super.getAuthenticationManager().authenticate(authRequest);
    }
}
