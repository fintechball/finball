package com.example.backend.repository.skin;

import com.example.backend.entity.Skin;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class SkinCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public SkinCustomRepository(JPAQueryFactory queryFactory) {
        super(Skin.class);
        this.queryFactory = queryFactory;
    }
}
