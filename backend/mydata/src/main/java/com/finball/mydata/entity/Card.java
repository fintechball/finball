package com.finball.mydata.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Card {

    @Id
    private String cardNo;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    private String name;

    private String image;

    private String cardCompanyName;
}
