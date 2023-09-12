package com.example.backend.dto;

import com.example.backend.entity.Member;
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

        public Member toMember() {
            return new Member().builder()
                    .userId(this.userId)
                    .password(this.password)
                    .name(this.name)
                    .phoneNumber(this.phoneNumber).build();
        }

    }


}
