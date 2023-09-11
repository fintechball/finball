package com.example.backend.entity;

import com.example.backend.type.DealType;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class GroupAccountHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long value;

    @Column
    private Long balance;

    @Column
    private LocalDateTime dealDt = LocalDateTime.now();

    @Column
    private DealType dealType;

    @Column
    private String target;

    @Column
    private String nickname;

    @Column
    private String opAccount;

    @Column
    private String opBankName;

    @ManyToOne
    private GroupAccount groupAccount;
}
