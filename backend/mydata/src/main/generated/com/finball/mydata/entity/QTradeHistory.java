package com.finball.mydata.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTradeHistory is a Querydsl query type for TradeHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTradeHistory extends EntityPathBase<TradeHistory> {

    private static final long serialVersionUID = 1180213172L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTradeHistory tradeHistory = new QTradeHistory("tradeHistory");

    public final QAccount account;

    public final QCompany company;

    public final DatePath<java.time.LocalDate> date = createDate("date", java.time.LocalDate.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath nickname = createString("nickname");

    public final StringPath opAccount = createString("opAccount");

    public final StringPath opBankName = createString("opBankName");

    public final NumberPath<Long> remain = createNumber("remain", Long.class);

    public final StringPath target = createString("target");

    public final TimePath<java.time.LocalTime> time = createTime("time", java.time.LocalTime.class);

    public final EnumPath<com.finball.mydata.type.DealType> type = createEnum("type", com.finball.mydata.type.DealType.class);

    public final NumberPath<Long> value = createNumber("value", Long.class);

    public QTradeHistory(String variable) {
        this(TradeHistory.class, forVariable(variable), INITS);
    }

    public QTradeHistory(Path<? extends TradeHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTradeHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTradeHistory(PathMetadata metadata, PathInits inits) {
        this(TradeHistory.class, metadata, inits);
    }

    public QTradeHistory(Class<? extends TradeHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.account = inits.isInitialized("account") ? new QAccount(forProperty("account"), inits.get("account")) : null;
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company")) : null;
    }

}

