package com.xjc.harlab.repository;

import com.xjc.harlab.model.Attacks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.math.BigDecimal;

public interface AttacksRepository extends JpaRepository<Attacks, BigDecimal>, JpaSpecificationExecutor<Attacks> {

}