package com.example.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGroupAccountMember is a Querydsl query type for GroupAccountMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupAccountMember extends EntityPathBase<GroupAccountMember> {

    private static final long serialVersionUID = 1976549480L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGroupAccountMember groupAccountMember = new QGroupAccountMember("groupAccountMember");

    public final NumberPath<Long> balance = createNumber("balance", Long.class);

    public final StringPath bankName = createString("bankName");

    public final QGroupAccount groupAccount;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMember member;

    public final NumberPath<Long> skinId = createNumber("skinId", Long.class);

    public final StringPath toAccountNo = createString("toAccountNo");

    public final NumberPath<Long> value = createNumber("value", Long.class);

    public QGroupAccountMember(String variable) {
        this(GroupAccountMember.class, forVariable(variable), INITS);
    }

    public QGroupAccountMember(Path<? extends GroupAccountMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGroupAccountMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGroupAccountMember(PathMetadata metadata, PathInits inits) {
        this(GroupAccountMember.class, metadata, inits);
    }

    public QGroupAccountMember(Class<? extends GroupAccountMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.groupAccount = inits.isInitialized("groupAccount") ? new QGroupAccount(forProperty("groupAccount"), inits.get("groupAccount")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

