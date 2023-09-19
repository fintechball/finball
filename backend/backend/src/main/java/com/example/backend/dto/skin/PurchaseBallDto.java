package com.example.backend.dto.skin;

import com.example.backend.entity.Inventory;
import com.example.backend.entity.Member;
import com.example.backend.entity.Skin;
import lombok.Data;

@Data
public class PurchaseBallDto {

    @Data
    public static class Request {

        Long id;

    }

    public static Inventory toInventory(Skin skin, Member member) {
        return Inventory.builder()
                .skin(skin)
                .member(member)
                .isSelected(false)
                .build();
    }
}
