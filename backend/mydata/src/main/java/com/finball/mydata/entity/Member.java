package com.finball.mydata.entity;

import javax.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String registrationNumber;

    private String password;

    private String roles;

    @Builder
    public Member(String name, String registrationNumber, String password, String roles) {
        this.name = name;
        this.registrationNumber = registrationNumber;
        this.password = password;
        this.roles = roles;
    }

    public List<String> getRoleList() {
        if (this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }
}