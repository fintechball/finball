package com.example.backend.security.filter;

import com.example.backend.error.ErrorCode;
import com.example.backend.error.ErrorResponse;
import com.example.backend.exception.security.FromLoginBadRequestException;
import com.example.backend.exception.security.FromLoginInvalidException;
import com.example.backend.exception.security.JwtTokenExpiredException;
import com.example.backend.exception.security.JwtTokenInvalidException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.NoSuchElementException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Order(2)
@RequiredArgsConstructor
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (JwtTokenInvalidException e) {
            ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.JWT_TOKEN_INVALID_VALUE);
            sendResponse(response, errorResponse);
        } catch (JwtTokenExpiredException e) {
            ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.JWT_TOKEN_EXPIRED);
            sendResponse(response, errorResponse);

        } catch (FromLoginBadRequestException e) {
            ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.FORM_LOGIN_BAD_REQUEST);
            sendResponse(response, errorResponse);

        } catch (FromLoginInvalidException e) {
            ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.FORM_LOGIN_INVALID);
            sendResponse(response, errorResponse);

        } catch (NoSuchElementException e) {
            ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.NOT_SAME_DATA_VALUE);
            sendResponse(response, errorResponse);
        }
    }

    private void sendResponse(HttpServletResponse response, ErrorResponse errorResponse)
            throws IOException {
        response.setContentType("application/json;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
