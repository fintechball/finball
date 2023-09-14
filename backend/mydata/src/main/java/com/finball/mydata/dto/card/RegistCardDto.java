package com.finball.mydata.dto.card;

import com.finball.mydata.entity.Card;
import com.finball.mydata.entity.Company;
import com.finball.mydata.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistCardDto {

    private String cardNumber;
    private String image;
    private String name;
    private Long companyId;

    public Card toCard(Member member, Company company) {
        return Card.builder()
                .cardNo(this.cardNumber)
                .image(this.image)
                .name(this.name)
                .company(company)
                .member(member)
                .build();
    }
}
