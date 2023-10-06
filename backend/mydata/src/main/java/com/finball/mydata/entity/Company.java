package com.finball.mydata.entity;

import com.finball.mydata.dto.company.CompanyDto;
import com.finball.mydata.type.CompanyType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long code;

    private String cpName;

    private String cpLogo;

    @Enumerated(EnumType.STRING)
    private CompanyType cpType;

    @Builder
    public Company(Long code, String cpName, String cpLogo) {
        this.code = code;
        this.cpName = cpName;
        this.cpLogo = cpLogo;
    }

    public CompanyDto toCompanyDto() {
        return new CompanyDto(this.code, this.cpName, this.cpLogo, false);
    }
}
