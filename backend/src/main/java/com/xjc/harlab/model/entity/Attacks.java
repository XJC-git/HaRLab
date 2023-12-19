package com.xjc.harlab.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "attacks")
public class Attacks implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "time")
    private Date time;

    @Column(name = "location")
    private String location;

    @Column(name = "user_id")
    private Integer userId;

}
