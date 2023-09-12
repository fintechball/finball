package com.example.backend.security.filter;

import com.example.backend.security.jwt.HeaderTokenExtractor;
import com.example.backend.security.jwt.JwtPreProcessingToken;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

// 요청이 들어오면 Token 값을 검사하는 FIlter
public class JwtAuthFilter extends AbstractAuthenticationProcessingFilter {

    private final RequestMatcher requestMatcher;
    private final HeaderTokenExtractor extractor;

    public JwtAuthFilter(RequestMatcher requestMatcher, HeaderTokenExtractor extractor) {
        super(requestMatcher);
        this.requestMatcher = requestMatcher;
        this.extractor = extractor;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
            HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        System.out.println("JwtAuthFilter : attemptAuthentication");

        String payLoad = request.getHeader("Authorization");

        if (payLoad == null || payLoad.length() == 0) {
            throw new IllegalArgumentException("토큰값이 잘못되었습니다."); // 성호 처리해줘~~~ ㅎㅅㅎ
        }

        JwtPreProcessingToken jwtToken = new JwtPreProcessingToken(
                extractor.extract(payLoad, request)
        );


        return super.getAuthenticationManager().authenticate(jwtToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        System.out.println("JwtAuthFilter : successfulAuthentication");
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authResult);
        SecurityContextHolder.setContext(context);

        chain.doFilter(
                request,
                response
        );
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        System.out.println("JwtAuthFilter : unsuccessfulAuthentication");
        super.unsuccessfulAuthentication(request, response, failed);
    }
}
