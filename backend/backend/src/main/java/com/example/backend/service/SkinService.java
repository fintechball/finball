package com.example.backend.service;

import com.example.backend.dto.skin.BallListDto;
import com.example.backend.dto.skin.CreateBallDto;
import com.example.backend.dto.skin.SkinInfo;
import com.example.backend.entity.Inventory;
import com.example.backend.entity.Skin;
import com.example.backend.repository.inventory.InventoryCustomRepository;
import com.example.backend.repository.skin.SkinCustomRepository;
import com.example.backend.repository.skin.SkinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkinService {

    private final SkinRepository skinRepository;
    private final InventoryCustomRepository inventoryCustomRepository;


    public void createSkin(CreateBallDto.Request request) {

        skinRepository.save(request.getSkin());
    }

    public BallListDto.response getBalls(String userId) {

        List<SkinInfo> skinInfoList = new ArrayList<>();

        List<Skin> skinList = skinRepository.findAll();
        List<Inventory> inventoryList = inventoryCustomRepository.findByMemberId(userId);
        List<Long> existSkinId = new ArrayList<>();

        for(Inventory inventory : inventoryList) {
            Long skinId = inventory.getSkin().getId();
            if(!existSkinId.contains(skinId)) {
                existSkinId.add(skinId);
            }
        }

        for (Skin skin : skinList) {
            if (existSkinId.contains(skin.getId())) {
                skinInfoList.add(skin.toSkinInfo(true));
            } else {
                skinInfoList.add(skin.toSkinInfo(false));
            }
        }

        return new BallListDto.response(skinInfoList);

    }
}
