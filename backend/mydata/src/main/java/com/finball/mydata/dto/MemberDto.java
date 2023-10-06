package com.finball.mydata.dto;

import com.finball.mydata.entity.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MemberDto {

    @Data
    @NoArgsConstructor
    public static class Request {

        private String name;
        private String registrationNumber;

        public Member toMember(String password) {
            return Member.builder().name(this.name)
                    .registrationNumber(this.registrationNumber)
                    .password(password)
                    .roles("ROLE_USER").build();
        }
    }
}
