package com.example.backend.repository.finballhistory;

import com.example.backend.entity.FinBallHistory;
import com.example.backend.entity.QFinBallAccount;
import com.example.backend.entity.QFinBallHistory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class FinBallHistoryCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    public FinBallHistoryCustomRepository(JPAQueryFactory jpaQueryFactory) {
        super(JPAQueryFactory.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<FinBallHistory> findAllByAccountId(String accountNo) {
        QFinBallHistory finBallHistory = QFinBallHistory.finBallHistory;
        QFinBallAccount finBallAccount = QFinBallAccount.finBallAccount;

        return jpaQueryFactory.select(finBallHistory)
                .from(finBallHistory)
                .leftJoin(finBallHistory.finBallAccount, finBallAccount).fetchJoin()
                .where(finBallAccount.accountNumber.eq(accountNo))
                .orderBy(finBallHistory.date.desc())
                .fetch();
    }
}
