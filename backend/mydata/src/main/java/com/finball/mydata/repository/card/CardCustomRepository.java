package com.finball.mydata.repository.card;

import static com.finball.mydata.entity.QAccount.account;

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

    public List<Card> findAllByMemberIdAndCompanyIdInWithFetchJoin(Long memberID, List<Long> companyCodes) {
        QCard card = QCard.card;

        System.out.println(companyCodes);
        System.out.println(memberID);

        return queryFactory
                .selectFrom(card)
                .leftJoin(card.company).fetchJoin()
                .leftJoin(card.member).fetchJoin()
                .where(card.member.id.eq(memberID).and(card.company.code.in(companyCodes)))
                .fetch();
    }
}
