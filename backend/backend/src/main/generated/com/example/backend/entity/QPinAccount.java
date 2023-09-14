package com.example.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPinAccount is a Querydsl query type for PinAccount
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPinAccount extends EntityPathBase<PinAccount> {

    private static final long serialVersionUID = -1156266920L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPinAccount pinAccount1 = new QPinAccount("pinAccount1");

    public final StringPath cardNumber = createString("cardNumber");

    public final QMember member;

    public final StringPath pinAccount = createString("pinAccount");

    public QPinAccount(String variable) {
        this(PinAccount.class, forVariable(variable), INITS);
    }

    public QPinAccount(Path<? extends PinAccount> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPinAccount(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPinAccount(PathMetadata metadata, PathInits inits) {
        this(PinAccount.class, metadata, inits);
    }

    public QPinAccount(Class<? extends PinAccount> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

