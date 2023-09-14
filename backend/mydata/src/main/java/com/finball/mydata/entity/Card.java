package com.finball.mydata.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    private String cardCompanyName;

    @Builder
    public Card(String cardNo, Member member, Company company, String name, String image,
            String cardCompanyName) {
        this.cardNo = cardNo;
        this.member = member;
        this.company = company;
        this.name = name;
        this.image = image;
        this.cardCompanyName = cardCompanyName;
    }
}
