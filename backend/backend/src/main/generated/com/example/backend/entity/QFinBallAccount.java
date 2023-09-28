package com.example.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFinBallAccount is a Querydsl query type for FinBallAccount
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFinBallAccount extends EntityPathBase<FinBallAccount> {

    private static final long serialVersionUID = -434996317L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFinBallAccount finBallAccount = new QFinBallAccount("finBallAccount");

    public final StringPath accountNo = createString("accountNo");

    public final NumberPath<Long> balance = createNumber("balance", Long.class);

    public final NumberPath<Integer> bookRefreshDate = createNumber("bookRefreshDate", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> closedAt = createDateTime("closedAt", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final BooleanPath isTexted = createBoolean("isTexted");

    public final QMember member;

    public final EnumPath<com.example.backend.type.MoneySource> moneySource = createEnum("moneySource", com.example.backend.type.MoneySource.class);

    public final StringPath originNo = createString("originNo");

    public final DateTimePath<java.time.LocalDateTime> refreshAt = createDateTime("refreshAt", java.time.LocalDateTime.class);

    public final EnumPath<com.example.backend.type.Usage> usage = createEnum("usage", com.example.backend.type.Usage.class);

    public QFinBallAccount(String variable) {
        this(FinBallAccount.class, forVariable(variable), INITS);
    }

    public QFinBallAccount(Path<? extends FinBallAccount> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFinBallAccount(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFinBallAccount(PathMetadata metadata, PathInits inits) {
        this(FinBallAccount.class, metadata, inits);
    }

    public QFinBallAccount(Class<? extends FinBallAccount> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

