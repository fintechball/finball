package com.example.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class PinAccount {

    @Id
    @Column
    private String cardNumber;

    @Column
    private String pinAccount;

    @ManyToOne
    private Member member;
}
