package com.example.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGroupAccountHistory is a Querydsl query type for GroupAccountHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupAccountHistory extends EntityPathBase<GroupAccountHistory> {

    private static final long serialVersionUID = 1121544326L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGroupAccountHistory groupAccountHistory = new QGroupAccountHistory("groupAccountHistory");

    public final NumberPath<Long> balance = createNumber("balance", Long.class);

    public final DateTimePath<java.time.LocalDateTime> dealDt = createDateTime("dealDt", java.time.LocalDateTime.class);

    public final EnumPath<com.example.backend.type.DealType> dealType = createEnum("dealType", com.example.backend.type.DealType.class);

    public final ListPath<GroupGameResult, QGroupGameResult> games = this.<GroupGameResult, QGroupGameResult>createList("games", GroupGameResult.class, QGroupGameResult.class, PathInits.DIRECT2);

    public final QGroupAccount groupAccount;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath nickname = createString("nickname");

    public final StringPath opAccount = createString("opAccount");

    public final StringPath opBankName = createString("opBankName");

    public final StringPath target = createString("target");

    public final NumberPath<Long> value = createNumber("value", Long.class);

    public QGroupAccountHistory(String variable) {
        this(GroupAccountHistory.class, forVariable(variable), INITS);
    }

    public QGroupAccountHistory(Path<? extends GroupAccountHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGroupAccountHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGroupAccountHistory(PathMetadata metadata, PathInits inits) {
        this(GroupAccountHistory.class, metadata, inits);
    }

    public QGroupAccountHistory(Class<? extends GroupAccountHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.groupAccount = inits.isInitialized("groupAccount") ? new QGroupAccount(forProperty("groupAccount"), inits.get("groupAccount")) : null;
    }

}

