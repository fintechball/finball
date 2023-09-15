package com.finball.mydata.repository;

import com.finball.mydata.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TradeHistoryCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;
    public TradeHistoryCustomRepository(JPAQueryFactory queryFactory) {
        super(TradeHistory.class);
        this.queryFactory = queryFactory;
    }

    public List<TradeHistory> findByAccountId(String accountId) {

        QTradeHistory tradeHistory = QTradeHistory.tradeHistory;
        QCompany company = QCompany.company;
        QAccount account = QAccount.account;

        return queryFactory
                .select(tradeHistory)
                .from(tradeHistory)
                .leftJoin(tradeHistory.company, company) // 카드와 회사 조인
                .fetchJoin()
                .leftJoin(tradeHistory.account, account) // 카드와 멤버 조인
                .fetchJoin()
                .where(tradeHistory.account.accountNo.eq(accountId))
                .orderBy(tradeHistory.date.asc())
                .orderBy(tradeHistory.time.asc())
                .fetch();
    }
}
