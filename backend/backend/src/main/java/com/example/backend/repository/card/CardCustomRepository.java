package com.example.backend.repository.card;

import com.example.backend.entity.Card;
import com.example.backend.entity.QCard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CardCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public CardCustomRepository(JPAQueryFactory queryFactory) {
        super(Card.class);
        this.queryFactory = queryFactory;
    }

    public List<String> findCpCodeByMemberId(String userId) {

        QCard card = QCard.card;

        return queryFactory
                .selectDistinct(card.cpName)
                .from(card)
                .where(card.member.userId.eq(userId))
                .fetch();
    }
}