package com.example.backend.entity;

import com.example.backend.dto.inventory.InventoryInfo;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private boolean isSelected;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Skin skin;

    public void setSelected(boolean selected) {
        isSelected = selected;
    }

    public InventoryInfo toSkinInfo() {
        return InventoryInfo.builder()
                .id(this.id)
                .image(this.skin.getImage())
                .name(this.skin.getName())
                .isSelected(this.isSelected)
                .build();
    }


}
