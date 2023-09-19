package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.skin.BallListDto;
import com.example.backend.dto.skin.CreateBallDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.SkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SkinController {

    private final SkinService skinService;

    @PostMapping("/ball/create")
    public Response<?> createSkin(@RequestBody CreateBallDto.Request request) {

        skinService.createSkin(request);

        return new Response(200, "skin 생성이 완료되었습니다.");
    }

    @GetMapping("/ball")
    public Response<BallListDto.response> getBalls(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        BallListDto.response response = skinService.getBalls(userDetails.getUsername());

        return new Response(200, "Ball List를 조회 완료했습니다.", response);
    }


}
