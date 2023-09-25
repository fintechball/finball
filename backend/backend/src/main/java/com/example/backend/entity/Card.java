package com.example.backend.entity;

import com.example.backend.dto.card.GetCardDto;
import com.example.backend.dto.yb.CardInfoDto;
import com.example.backend.dto.yb.CompanyInfoDto;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Card {

    @Id
    @Column
    private String number;

    @Column
    private String name;

    @Column
    private String cpName;

    @Column
    private Long cpCode;

    @Column
    private String cpLogo;

    @Column
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    public GetCardDto toGetCardDto() {
        CardInfoDto cardInfoDto = CardInfoDto.builder()
                .name(this.name)
                .image(this.image)
                .no(this.number)
                .build();

        CompanyInfoDto companyInfoDto = CompanyInfoDto.builder()
                .code(this.cpCode)
                .name(this.cpName)
                .logo(this.cpLogo)
                .build();

        return GetCardDto.builder()
                .card(cardInfoDto)
                .company(companyInfoDto)
                .build();
    }
}
