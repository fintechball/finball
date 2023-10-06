package com.example.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccountBook is a Querydsl query type for AccountBook
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccountBook extends EntityPathBase<AccountBook> {

    private static final long serialVersionUID = 1259255094L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAccountBook accountBook = new QAccountBook("accountBook");

    public final QFinBallAccount finBallAccount;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.LocalDateTime> updateDt = createDateTime("updateDt", java.time.LocalDateTime.class);

    public final NumberPath<Long> value = createNumber("value", Long.class);

    public QAccountBook(String variable) {
        this(AccountBook.class, forVariable(variable), INITS);
    }

    public QAccountBook(Path<? extends AccountBook> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAccountBook(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAccountBook(PathMetadata metadata, PathInits inits) {
        this(AccountBook.class, metadata, inits);
    }

    public QAccountBook(Class<? extends AccountBook> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.finBallAccount = inits.isInitialized("finBallAccount") ? new QFinBallAccount(forProperty("finBallAccount"), inits.get("finBallAccount")) : null;
    }

}

