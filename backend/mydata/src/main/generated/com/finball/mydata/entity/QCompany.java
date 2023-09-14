package com.finball.mydata.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCompany is a Querydsl query type for Company
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCompany extends EntityPathBase<Company> {

    private static final long serialVersionUID = 925690073L;

    public static final QCompany company = new QCompany("company");

    public final NumberPath<Long> cpCode = createNumber("cpCode", Long.class);

    public final StringPath cpLogo = createString("cpLogo");

    public final StringPath cpName = createString("cpName");

    public final EnumPath<com.finball.mydata.type.CompanyType> cpType = createEnum("cpType", com.finball.mydata.type.CompanyType.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QCompany(String variable) {
        super(Company.class, forVariable(variable));
    }

    public QCompany(Path<? extends Company> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCompany(PathMetadata metadata) {
        super(Company.class, metadata);
    }

}

