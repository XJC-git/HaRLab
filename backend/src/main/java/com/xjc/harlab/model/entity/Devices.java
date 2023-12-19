package com.xjc.harlab.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "devices")
public class Devices implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "name", nullable = true)
    private String name;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "uuid", nullable = false)
    private String uuid;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

}
