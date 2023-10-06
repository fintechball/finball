package com.example.backend.dto;

import com.example.backend.entity.Member;
import com.example.backend.type.UserType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserSignUpDto {

    @Data
    public static class Request {

        private String userId;
        private String password;
        private String name;
        private String phoneNumber;

        public Member toMember(String encodedPassword) {

            return new Member().builder()
                    .userId(this.userId)
                    .password(encodedPassword)
                    .name(this.name)
                    .type(UserType.USER)
                    .phoneNumber(this.phoneNumber).build();
        }

    }


}
