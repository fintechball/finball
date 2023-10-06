package com.example.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGroupGameResult is a Querydsl query type for GroupGameResult
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupGameResult extends EntityPathBase<GroupGameResult> {

    private static final long serialVersionUID = -795615986L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGroupGameResult groupGameResult = new QGroupGameResult("groupGameResult");

    public final QGroupAccountHistory groupAccountHistory;

    public final QGroupAccountMember groupAccountMember;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> lose = createNumber("lose", Long.class);

    public QGroupGameResult(String variable) {
        this(GroupGameResult.class, forVariable(variable), INITS);
    }

    public QGroupGameResult(Path<? extends GroupGameResult> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGroupGameResult(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGroupGameResult(PathMetadata metadata, PathInits inits) {
        this(GroupGameResult.class, metadata, inits);
    }

    public QGroupGameResult(Class<? extends GroupGameResult> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.groupAccountHistory = inits.isInitialized("groupAccountHistory") ? new QGroupAccountHistory(forProperty("groupAccountHistory"), inits.get("groupAccountHistory")) : null;
        this.groupAccountMember = inits.isInitialized("groupAccountMember") ? new QGroupAccountMember(forProperty("groupAccountMember"), inits.get("groupAccountMember")) : null;
    }

}

