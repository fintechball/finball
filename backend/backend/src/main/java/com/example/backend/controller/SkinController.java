package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.entity.Skin;
import com.example.backend.service.SkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SkinController {

    private final SkinService skinService;

    @PostMapping("/ball/create")
    public Response<?> createSkin(@RequestBody Skin skin) {

        skinService.createSkin(skin);

        return new Response(200, "skin 생성이 완료되었습니다.");
    }





}
