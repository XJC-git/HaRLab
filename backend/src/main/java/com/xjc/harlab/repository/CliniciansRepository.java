package com.xjc.harlab.repository;

import com.xjc.harlab.model.Clinicians;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.math.BigDecimal;

public interface CliniciansRepository extends JpaRepository<Clinicians, BigDecimal>, JpaSpecificationExecutor<Clinicians> {

}