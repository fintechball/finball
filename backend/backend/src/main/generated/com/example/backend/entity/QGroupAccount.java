package com.example.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGroupAccount is a Querydsl query type for GroupAccount
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupAccount extends EntityPathBase<GroupAccount> {

    private static final long serialVersionUID = 2085921838L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGroupAccount groupAccount = new QGroupAccount("groupAccount");

    public final StringPath accountNo = createString("accountNo");

    public final NumberPath<Long> balance = createNumber("balance", Long.class);

    public final DateTimePath<java.time.LocalDateTime> closedAt = createDateTime("closedAt", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final EnumPath<com.example.backend.type.GameType> gameType = createEnum("gameType", com.example.backend.type.GameType.class);

    public final QMember member;

    public final StringPath name = createString("name");

    public final DateTimePath<java.time.LocalDateTime> refreshAt = createDateTime("refreshAt", java.time.LocalDateTime.class);

    public final StringPath url = createString("url");

    public final BooleanPath valid = createBoolean("valid");

    public QGroupAccount(String variable) {
        this(GroupAccount.class, forVariable(variable), INITS);
    }

    public QGroupAccount(Path<? extends GroupAccount> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGroupAccount(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGroupAccount(PathMetadata metadata, PathInits inits) {
        this(GroupAccount.class, metadata, inits);
    }

    public QGroupAccount(Class<? extends GroupAccount> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

