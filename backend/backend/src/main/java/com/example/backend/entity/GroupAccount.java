package com.example.backend.entity;

import com.example.backend.type.GameType;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class GroupAccount {

    @Id
    @Column
    private String accountNumber;

    @Column
    private Long balance;

    @Column
    private LocalDateTime refreshDt;

    @Column
    private String name;

    @Column
    private GameType gameType;

    @Column
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}
