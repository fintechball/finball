package com.example.backend.security;

import com.example.backend.dto.Response;
import com.example.backend.dto.member.MemberLoginDto;
import com.example.backend.entity.Member;
import com.example.backend.entity.Skin;
import com.example.backend.security.jwt.JwtTokenUtils;
import com.example.backend.service.InventoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
public class FormLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final JwtTokenUtils jwtTokenUtils;
    private final InventoryService inventoryService;

    private final String ACCESS_TOKEN = "ACCESS_TOKEN";
    private final String REFRESH_TOKEN = "REFRESH_TOKEN";
    private final String TOKEN_HEADER = "Bearer ";

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        System.out.println("FormLoginSuccessHandler : onAuthenticationSuccess");

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Map<String, String> map = jwtTokenUtils.generatedJwtToken(userDetails);

        String accessToken = TOKEN_HEADER + map.get(ACCESS_TOKEN);
        String refreshToken = TOKEN_HEADER + map.get(REFRESH_TOKEN);

        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        Member member = userDetails.getMember();

        Skin skin = inventoryService.selectedBall(member.getUserId());

        MemberLoginDto memberLoginDto = new MemberLoginDto(member, accessToken, refreshToken, skin);

        response.getWriter().write(objectMapper.writeValueAsString(
                new Response<MemberLoginDto>(200, "성공적으로 로그인 되었습니다.", memberLoginDto)));
    }
}
