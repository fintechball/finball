package com.example.backend.repository.category;

import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.QCategory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public CategoryCustomRepository(JPAQueryFactory queryFactory) {
        super(Category.class);
        this.queryFactory = queryFactory;
    }


    public Long deleteAllByCategoryId(ArrayList<Category> deleteCategoryList) {
        QCategory category = QCategory.category;

        return queryFactory
                .delete(category)
                .where(category.in(deleteCategoryList))
                .execute();
    }

    public void deleteAllCategories(FinBallAccount account) {
        QCategory category = QCategory.category;

        queryFactory.delete(category).where(category.finBallAccount.eq(account)).execute();
    }
}
