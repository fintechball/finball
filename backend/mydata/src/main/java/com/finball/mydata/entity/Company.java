package com.finball.mydata.entity;

import com.finball.mydata.dto.company.CompanyDto;
import com.finball.mydata.type.CompanyType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cpName;

    private String cpLogo;

    private Long cpCode;

    @Builder
    public Company(Long id, String cpName, String cpLogo) {
        this.id = id;
        this.cpName = cpName;
        this.cpLogo = cpLogo;
    }
    
    @Enumerated(EnumType.STRING)
    private CompanyType cpType;

    public CompanyDto toCompanyInfoDto(){
        return new CompanyDto(this.cpName, this.cpLogo, this.cpCode, false);
    }
}
