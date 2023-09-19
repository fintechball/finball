package com.example.backend.service;

import com.example.backend.dto.inventory.InventoryDto;
import com.example.backend.dto.inventory.InventoryInfo;
import com.example.backend.dto.skin.PurchaseBallDto;
import com.example.backend.entity.Inventory;
import com.example.backend.entity.Member;
import com.example.backend.entity.Skin;
import com.example.backend.repository.inventory.InventoryCustomRepository;
import com.example.backend.repository.inventory.InventoryRepository;
import com.example.backend.repository.member.MemberRepository;
import com.example.backend.repository.skin.SkinRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final SkinRepository skinRepository;
    private final MemberRepository memberRepository;
    private final InventoryCustomRepository inventoryCustomRepository;

    public InventoryDto.Response getInventory(String userId) {

        List<InventoryInfo> response = new ArrayList<>();
        List<Inventory> inventoryList = inventoryCustomRepository.findAllByMemberId(userId);

        for (Inventory inventory : inventoryList) {
            response.add(inventory.toSkinInfo());
        }

        return new InventoryDto.Response(response);

    }

    public void purchaseBall(Long id, String userId) {

        Skin skin = skinRepository.findById(id).get();
        Member member = memberRepository.findByUserId(userId).get();

        Inventory inventory = new PurchaseBallDto().toInventory(skin, member);

        inventoryRepository.save(inventory);
    }

    @Transactional
    public void selectBall(Long id, String userId) {

        List<Inventory> inventoryList =  inventoryCustomRepository.findByMemberIdAndSkinId(id, userId);

        Inventory inventory = inventoryList.get(0);

        inventory.setSelected(true);
    }
}
