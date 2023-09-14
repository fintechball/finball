package com.finball.mydata.entity;

import com.finball.mydata.dto.card.CardInfoDto;
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
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    private String name;

    private String image;

    public CardInfoDto toCardInfoDto() {
        return CardInfoDto.builder()
                .name(this.name)
                .image(this.image)
                .code(String.valueOf(this.company.getCpCode()))
                .cardCompanyName(this.company.getCpName())
                .cardNumber(this.cardNo)
                .build();
    }
}
