package com.example.backend.repository.inventory;

import com.example.backend.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class InventoryCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public InventoryCustomRepository(JPAQueryFactory queryFactory) {
        super(Inventory.class);
        this.queryFactory = queryFactory;
    }


    public List<Inventory> findAllByMemberId(String userId) {
        QInventory inventory = QInventory.inventory;
        QMember member = QMember.member;
        QSkin skin = QSkin.skin;

        return queryFactory.select(inventory)
                .from(inventory)
                .leftJoin(inventory.skin, skin).fetchJoin()
                .leftJoin(inventory.member, member).fetchJoin()
                .where(member.userId.eq(userId)).fetch();
    }

    public List<Inventory> findBySkinIdAndMemberId(Long id, String userId) {
        QInventory inventory = QInventory.inventory;
        QMember member = QMember.member;
        QSkin skin = QSkin.skin;

        return queryFactory.select(inventory)
                .from(inventory)
                .leftJoin(inventory.skin, skin).fetchJoin()
                .leftJoin(inventory.member, member).fetchJoin()
                .where(member.userId.eq(userId).and(skin.id.eq(id)))
                .fetch();
    }

    public List<Inventory> findByMemberId(String userId) {

        QInventory inventory = QInventory.inventory;
        QMember member = QMember.member;
        QSkin skin = QSkin.skin;

        return queryFactory.selectDistinct(inventory)
                .from(inventory)
                .leftJoin(inventory.skin, skin).fetchJoin()
                .leftJoin(inventory.member, member).fetchJoin()
                .where(member.userId.eq(userId))
                .fetch();

    }

    public List<Inventory> findSelectedBallByMemberId(String userId) {

        QInventory inventory = QInventory.inventory;
        QMember member = QMember.member;
        QSkin skin = QSkin.skin;

        return queryFactory.selectDistinct(inventory)
                .from(inventory)
                .leftJoin(inventory.skin, skin).fetchJoin()
                .leftJoin(inventory.member, member).fetchJoin()
                .where(member.userId.eq(userId).and(inventory.isSelected.eq(true)))
                .fetch();

    }
}
