package com.xjc.harlab.repository;

import com.xjc.harlab.model.entity.AlertQueryResult;
import com.xjc.harlab.model.entity.Attacks;
import org.hibernate.annotations.processing.SQL;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

public interface AttacksRepository extends JpaRepository<Attacks, Integer>, JpaSpecificationExecutor<Attacks> {

    @Query("select a from Attacks a where a.userId = :userId and a.time between :startTime and :endTime order by a.time")
    Collection<Attacks> getAttacksForParticipants(int userId, BigInteger startTime, BigInteger endTime);

    @Query(name = "queryParticipantsWithAlert",nativeQuery = true)
    Collection<AlertQueryResult> getParticipantsWithAlert(BigInteger date);


    Page<Attacks> findAllByUserId(Pageable pageable,Integer userId);
}