package com.example.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFinBallHistory is a Querydsl query type for FinBallHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFinBallHistory extends EntityPathBase<FinBallHistory> {

    private static final long serialVersionUID = 1669256714L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFinBallHistory finBallHistory = new QFinBallHistory("finBallHistory");

    public final NumberPath<Long> balance = createNumber("balance", Long.class);

    public final QCategory category;

    public final DateTimePath<java.time.LocalDateTime> date = createDateTime("date", java.time.LocalDateTime.class);

    public final EnumPath<com.example.backend.type.DealType> dealType = createEnum("dealType", com.example.backend.type.DealType.class);

    public final QFinBallAccount finBallAccount;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath nickname = createString("nickname");

    public final StringPath opAccount = createString("opAccount");

    public final StringPath opBankName = createString("opBankName");

    public final StringPath target = createString("target");

    public final NumberPath<Long> value = createNumber("value", Long.class);

    public QFinBallHistory(String variable) {
        this(FinBallHistory.class, forVariable(variable), INITS);
    }

    public QFinBallHistory(Path<? extends FinBallHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFinBallHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFinBallHistory(PathMetadata metadata, PathInits inits) {
        this(FinBallHistory.class, metadata, inits);
    }

    public QFinBallHistory(Class<? extends FinBallHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new QCategory(forProperty("category"), inits.get("category")) : null;
        this.finBallAccount = inits.isInitialized("finBallAccount") ? new QFinBallAccount(forProperty("finBallAccount"), inits.get("finBallAccount")) : null;
    }

}

