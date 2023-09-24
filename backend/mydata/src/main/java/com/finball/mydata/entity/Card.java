package com.finball.mydata.entity;

import com.finball.mydata.dto.card.CardDto;
import com.finball.mydata.dto.card.CardInfoDto;
import com.finball.mydata.dto.company.CompanyDto;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Card {

    @Id
    private String cardNo;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    private String name;

    private String image;

    public CardDto toCardInfoDto() {
        CardInfoDto cardInfoDto = CardInfoDto.builder()
                .name(this.name)
                .image(this.image)
                .no(this.cardNo)
                .build();

        CompanyDto companyDto = CompanyDto.builder()
                .code(this.company.getCode())
                .name(this.company.getCpName())
                .logo(this.company.getCpLogo())
                .build();

        return CardDto.builder()
                .card(cardInfoDto)
                .company(companyDto)
                .build();
    }
}
