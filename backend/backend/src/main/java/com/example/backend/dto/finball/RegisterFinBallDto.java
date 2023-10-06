package com.example.backend.dto.finball;

import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.Member;
import com.example.backend.type.MoneySource;
import com.example.backend.type.Usage;
import java.util.Random;
import lombok.Data;

@Data
public class RegisterFinBallDto {

    @Data
    public static class Request {

        private String usage;           //사용목적
        private String moneySource;     //자금출처
        private Boolean isTexted;       //해외세금

        public FinBallAccount toFinballAccount(Member member) {
            Random random = new Random();

            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < 14; i++) {
                if (i % 6 == 5) {
                    sb.append("-");
                }
                sb.append(random.nextInt(10));
            }

            return FinBallAccount.builder()
                    .accountNo(sb.toString())
                    .originNo(sb.toString().replace("-", ""))
                    .balance(0L)
                    .isTexted(this.isTexted)
                    .usage(Usage.valueOf(this.usage))
                    .moneySource(MoneySource.valueOf(this.moneySource))
                    .member(member)
                    .build();
        }
    }
}
