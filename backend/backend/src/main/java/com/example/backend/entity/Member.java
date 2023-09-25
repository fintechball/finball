package com.example.backend.entity;

import com.example.backend.type.UserType;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String userId;

    @Column(unique = true, nullable = false)
    private String phoneNumber;

    @Column
    private String easyPassword;

    @Column
    private int point = 0;

    @Column
    private String profileImg = "/defaultProfileImg";

    @Column(nullable = false)
    private String password;

    @Column
    private String email;

    @Column
    private UserType type = UserType.USER;

    public void registerEasyPassword(String easyPassword) {
        this.easyPassword = easyPassword;
    }
}
