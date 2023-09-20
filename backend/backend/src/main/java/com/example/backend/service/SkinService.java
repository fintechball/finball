package com.example.backend.service;

import com.example.backend.dto.skin.BallListDto;
import com.example.backend.dto.skin.CreateBallDto;
import com.example.backend.dto.skin.SkinInfo;
import com.example.backend.entity.Inventory;
import com.example.backend.entity.Skin;
import com.example.backend.repository.inventory.InventoryCustomRepository;
import com.example.backend.repository.skin.SkinRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SkinService {

    private final SkinRepository skinRepository;
    private final InventoryCustomRepository inventoryCustomRepository;


    public void createSkin(CreateBallDto.Request request) {

        skinRepository.save(request.getSkin());
    }

    public BallListDto.response getBalls(String userId) {

        List<Skin> skinList = skinRepository.findAll();
        List<Inventory> inventoryList = inventoryCustomRepository.findByMemberId(userId);

        return new BallListDto.response(checkIsInvented(skinList, inventoryList));

    }

    public List<SkinInfo> checkIsInvented(List<Skin> skinList, List<Inventory> inventoryList) {

        List<SkinInfo> skinInfoList = new ArrayList<>();
        List<Long> existSkinId = getSkinId(inventoryList);

        for (Skin skin : skinList) {
            if (existSkinId.contains(skin.getId())) {
                skinInfoList.add(skin.toSkinInfo(true));
            } else {
                skinInfoList.add(skin.toSkinInfo(false));
            }
        }

        return skinInfoList;
    }

    public List<Long> getSkinId(List<Inventory> inventoryList) {

        List<Long> existSkinId = new ArrayList<>();

        for (Inventory inventory : inventoryList) {
            Long skinId = inventory.getSkin().getId();
            if (!existSkinId.contains(skinId)) {
                existSkinId.add(skinId);
            }
        }

        return existSkinId;
    }

}
