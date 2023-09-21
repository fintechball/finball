package com.example.backend.entity;

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
    private String cardNumber;

    @Column
    private String name;

    @Column
    private String cpName;

    @Column
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}
