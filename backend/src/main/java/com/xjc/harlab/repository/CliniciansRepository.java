package com.xjc.harlab.repository;

import com.xjc.harlab.model.entity.Clinicians;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CliniciansRepository extends JpaRepository<Clinicians, Integer>, JpaSpecificationExecutor<Clinicians> {

}