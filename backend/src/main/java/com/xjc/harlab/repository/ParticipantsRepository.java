package com.xjc.harlab.repository;

import com.xjc.harlab.model.Participants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.math.BigDecimal;

public interface ParticipantsRepository extends JpaRepository<Participants, BigDecimal>, JpaSpecificationExecutor<Participants> {

}