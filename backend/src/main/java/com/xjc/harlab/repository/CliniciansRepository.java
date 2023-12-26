package com.xjc.harlab.repository;

import com.xjc.harlab.model.entity.Clinicians;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.Optional;

public interface CliniciansRepository extends JpaRepository<Clinicians, Integer>, JpaSpecificationExecutor<Clinicians> {
    Clinicians findByUsername(String username);

    @Query("select c from Clinicians c where c.username=:username and c.password=:password")
    Optional<Clinicians> loginQuery(String username,String password);
}