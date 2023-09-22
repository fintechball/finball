package com.example.backend.repository.finballaccount;

import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.QFinBallAccount;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class FinBallAccountCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    public FinBallAccountCustomRepository(JPAQueryFactory jpaQueryFactory) {
        super(FinBallAccount.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<FinBallAccount> findAllByAccountNo(List<String> accountNoList) {
        QFinBallAccount finBallAccount = QFinBallAccount.finBallAccount;

        return jpaQueryFactory.select(finBallAccount)
                .from(finBallAccount)
                .where(finBallAccount.accountNumber.in(accountNoList))
                .fetch();
    }
}
