package com.example.backend.service;

import com.example.backend.dto.inventory.InventoryListDto;
import com.example.backend.dto.inventory.InventoryDto;
import com.example.backend.dto.skin.PurchaseBallDto;
import com.example.backend.entity.Inventory;
import com.example.backend.entity.Member;
import com.example.backend.entity.Skin;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.inventory.InventoryCustomRepository;
import com.example.backend.repository.inventory.InventoryRepository;
import com.example.backend.repository.member.MemberRepository;
import com.example.backend.repository.skin.SkinRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    public InventoryListDto.Response getInventory(String userId) {

        List<InventoryDto> response = new ArrayList<>();
        List<Inventory> inventoryList = inventoryCustomRepository.findAllByMemberId(userId);

        for (Inventory inventory : inventoryList) {
            response.add(inventory.toSkinInfo());
        }

        return new InventoryListDto.Response(response);

    }

    @Transactional
    public void purchaseBall(Long id, String userId) {

        List<Inventory> inventoryList = inventoryCustomRepository.findBySkinIdAndMemberId(id, userId);

        if(inventoryList.size() > 0 ) {
            throw new CustomException(ErrorCode.ALREADY_IN_USE);
        }

        Skin skin = skinRepository.findById(id).get();
        Member member = memberRepository.findByUserId(userId).get();

        if(skin.getValue() > member.getPoint()) {
            throw new CustomException(ErrorCode.LACK_OF_POINT);
        }

        Inventory inventory = new PurchaseBallDto().toInventory(skin, member);
        member.setPoint(member.getPoint() - skin.getValue());
        memberRepository.save(member);
        inventoryRepository.save(inventory);
    }

    @Transactional
    public void selectBall(Long id, String userId) {

        List<Inventory> selectedInventoryList =  inventoryCustomRepository.findSelectedBallByMemberId(userId);
        Optional<Inventory> selectingInventoryOptinal =  inventoryRepository.findById(id);

        if(!selectingInventoryOptinal.isPresent()) {
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

        if(selectedInventoryList.size() == 1) {
            Inventory selectedInventory = selectedInventoryList.get(0);
            selectedInventory.setSelected(false);
        }
        Inventory selectingInventory = selectingInventoryOptinal.get();
        selectingInventory.setSelected(true);
    }

    @Transactional
    public void initBall(String userId) {
        Skin skin = skinRepository.findById(5L).get();
        Member member = memberRepository.findByUserId(userId).get();
        Inventory inventory = new PurchaseBallDto().initInventory(skin, member);
        inventoryRepository.save(inventory);
    }


}
