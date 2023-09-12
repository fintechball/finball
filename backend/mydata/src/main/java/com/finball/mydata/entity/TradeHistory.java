package com.finball.mydata.entity;

import com.finball.mydata.type.DealType;
import java.time.LocalDate;
import java.time.LocalTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class TradeHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    private Long value;

    private Long remain;

    private LocalDate date;

    private LocalTime time;

    private DealType type;

    private String target;

    private String nickname;

    private String opAccount;

    private String opBankName;
}
