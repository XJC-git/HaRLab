package com.xjc.harlab.repository;

import com.xjc.harlab.model.Devices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DevicesRepository extends JpaRepository<Devices, Void>, JpaSpecificationExecutor<Devices> {

}