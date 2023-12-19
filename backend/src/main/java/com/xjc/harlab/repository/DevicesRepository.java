package com.xjc.harlab.repository;

import com.xjc.harlab.model.entity.Devices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface DevicesRepository extends JpaRepository<Devices, Integer>, JpaSpecificationExecutor<Devices> {

    List<Devices> findByUserId(Integer id);
}