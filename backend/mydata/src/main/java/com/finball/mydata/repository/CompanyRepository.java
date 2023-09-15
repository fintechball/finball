package com.finball.mydata.repository;

import com.finball.mydata.entity.Company;
import com.finball.mydata.type.CompanyType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    public Company findByCpCode(Long code);
    List<Company> findAllByCpType(CompanyType companyType);
}
