package com.finball.mydata.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Company {

    @Id
    private Long id;

    private String cpName;

    private String cpLogo;
}
