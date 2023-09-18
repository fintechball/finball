package com.example.backend.service;

import com.example.backend.dto.inventory.InventoryDto;
import com.example.backend.dto.inventory.SkinInfo;
import com.example.backend.entity.Inventory;
import com.example.backend.repository.inventory.InventoryCustomRepository;
import com.example.backend.repository.inventory.InventoryRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final InventoryCustomRepository inventoryCustomRepository;

    public InventoryDto.Response getInventory(String userId) {

        List<SkinInfo> response = new ArrayList<>();
        List<Inventory> inventoryList = inventoryCustomRepository.findAllByMemberId(userId);

        for (Inventory inventory : inventoryList) {
            response.add(inventory.toSkinInfo());
        }

        return new InventoryDto.Response(response);

    }
}
