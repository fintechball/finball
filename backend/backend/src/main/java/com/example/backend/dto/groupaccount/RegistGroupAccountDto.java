package com.example.backend.dto.groupaccount;

import com.example.backend.entity.FinBallAccount;
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

        private final String URL_PREFIX = "https://j9e106.p.ssafy.io/accept/group-account/";

        public GroupAccount toGroupAccount(Member member) {

            String url = makeUrl();
            String accountNo = generateAccount();
            String originNo = accountNo.replace("-", "");
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
                    .originNo(originNo)
                    .member(member)
                    .build();
        }

        private String makeUrl() {
            return URL_PREFIX + UUID.randomUUID();
        }

        public GroupAccountMember toGroupAccountMember(Member member, GroupAccount groupAccount, FinBallAccount finBallAccount) {
            long zero = 0;
            String CpName = "핀볼";
            return GroupAccountMember.builder()
                    .toAccountNo(finBallAccount.getAccountNo())
                    .cpName(CpName)
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
