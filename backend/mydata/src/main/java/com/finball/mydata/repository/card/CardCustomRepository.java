package com.finball.mydata.repository.card;

import com.finball.mydata.entity.Card;
import com.finball.mydata.entity.Member;
import com.finball.mydata.entity.QCard;
import com.finball.mydata.entity.QCompany;
import com.finball.mydata.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CardCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;
    public CardCustomRepository(JPAQueryFactory queryFactory) {
        super(Card.class);
        this.queryFactory = queryFactory;
    }

    public List<Card> findByMemberIdJoinCompany(Long memberID) {
        QCard card = QCard.card;
        QCompany company = QCompany.company;
        QMember member = QMember.member;

        return queryFactory
                .select(card)
                .from(card)
                .leftJoin(card.company, company) // 카드와 회사 조인
                .fetchJoin()
                .leftJoin(card.member, member) // 카드와 멤버 조인
                .fetchJoin()
                .where(card.member.id.eq(memberID))
                .orderBy(card.company.cpCode.asc())
                .fetch();
    }
}
