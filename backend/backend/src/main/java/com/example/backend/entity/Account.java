package com.example.backend.entity;

import com.example.backend.dto.account.AccountRegisterDto;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Account {

    @Id
    @Column
    private String accountNo;

    @Column
    private String originNo;

    @Column
    private String name;

    @Column
    private String cpLogo;

    @Column
    private String cpName;

    @Column
    private Long cpCode;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime closedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}
