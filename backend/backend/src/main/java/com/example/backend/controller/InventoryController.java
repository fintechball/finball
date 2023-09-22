package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.inventory.InventoryListDto;
import com.example.backend.dto.skin.PurchaseBallDto;
import com.example.backend.dto.skin.SelectBallDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("ball/inventory")
    public Response<InventoryListDto.Response> getInventory(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        String userId = userDetails.getUsername();
        InventoryListDto.Response response = inventoryService.getInventory(userId);

        return new Response(200, "보유중인 스킨 목록을 조회하였습니다.", response);
    }

    @PostMapping("/ball/purchase")
    public Response<?> purchaseBall(@RequestBody PurchaseBallDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        String userId = userDetails.getUsername();
        Long id = request.getId();

        inventoryService.purchaseBall(id, userId);

        return new Response(200, "스킨 구매를 완료되었습니다.");
    }

    @PostMapping("/ball/select")
    public Response<?> selectBall(@RequestBody SelectBallDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        String userId = userDetails.getUsername();
        Long id = request.getId();

        inventoryService.selectBall(id, userId);

        return new Response(200, "스킨 선택을 완료되었습니다.");
    }


}
