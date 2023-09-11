package com.example.backend.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Account {

    @Id
    @Column
    private String accountNumber;

    @Column
    private String name;

    @Column
    private String cpLogo;

    @Column
    private String cpName;

    @Column
    private LocalDateTime createdDt;

    @Column
    private LocalDateTime closedDt;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}
