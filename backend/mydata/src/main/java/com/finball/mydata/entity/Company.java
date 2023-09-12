package com.finball.mydata.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Company {

    @Id
    private Long id;

    private String cpName;

    private String cpLogo;
}
