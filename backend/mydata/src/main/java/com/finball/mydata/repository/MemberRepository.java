package com.finball.mydata.repository;

import com.finball.mydata.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    public Member findByRegistrationNumber(String name);
}
