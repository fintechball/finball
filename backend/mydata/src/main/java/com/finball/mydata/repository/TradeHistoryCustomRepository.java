package com.finball.mydata.repository;

import com.finball.mydata.entity.TradeHistory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class TradeHistoryCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public TradeHistoryCustomRepository(JPAQueryFactory queryFactory) {
        super(TradeHistory.class);
        this.queryFactory = queryFactory;
    }

}
