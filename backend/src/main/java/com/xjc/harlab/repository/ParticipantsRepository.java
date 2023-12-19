package com.xjc.harlab.repository;

import com.xjc.harlab.model.entity.Participants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ParticipantsRepository extends JpaRepository<Participants, Integer>, JpaSpecificationExecutor<Participants> {

    Participants findByUsername(String username);
}