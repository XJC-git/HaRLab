package com.xjc.harlab.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Table(name = "participants")
@Data
@Entity
public class Participants implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id", nullable = false)
    private BigDecimal id;
    @Column(name = "username")
    private Integer username;
}
