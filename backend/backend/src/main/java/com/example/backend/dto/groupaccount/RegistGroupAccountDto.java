package com.example.backend.dto.groupaccount;

import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.GroupAccountMember;
import com.example.backend.entity.Member;
import com.example.backend.type.GameType;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class RegistGroupAccountDto {

    @Builder
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {

        private String name;
        private GameType gameType;
        private String accountNo;
        private String bankName;

        public GroupAccount toGroupAccount(Member member) {
            String url = UUID.randomUUID().toString();
            String accountNo = generateAccount();
            LocalDateTime refreshAt = LocalDateTime.now();
            boolean isValid = true;

            return GroupAccount.builder()
                    .name(this.name)
                    .gameType(this.gameType)
                    .balance(0)
                    .url(url)
                    .accountNo(accountNo)
                    .valid(isValid)
                    .refreshAt(refreshAt)
                    .member(member)
                    .build();
        }

        public GroupAccountMember toGroupAccountMember(Member member, GroupAccount groupAccount) {
            long zero = 0;
            return GroupAccountMember.builder()
                    .toAccountNo(this.accountNo)
                    .bankName(this.bankName)
                    .value(zero)
                    .balance(zero)
                    .skinId(zero)
                    .member(member)
                    .groupAccount(groupAccount)
                    .build();
        }

        private String generateAccount() {
            Random random = new Random();

            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < 14; i++) {
                if (i % 6 == 5) {
                    sb.append("-");
                }
                sb.append(random.nextInt(10));
            }
            return sb.toString();
        }
    }
}
