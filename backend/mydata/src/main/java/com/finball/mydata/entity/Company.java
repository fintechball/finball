package com.finball.mydata.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company {

    @Id
    private Long id;

    private String cpName;

    private String cpLogo;

    @Builder
    public Company(Long id, String cpName, String cpLogo) {
        this.id = id;
        this.cpName = cpName;
        this.cpLogo = cpLogo;
    }
}
