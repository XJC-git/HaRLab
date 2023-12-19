package com.xjc.harlab.repository;

import com.xjc.harlab.model.entity.Attacks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AttacksRepository extends JpaRepository<Attacks, Integer>, JpaSpecificationExecutor<Attacks> {

}