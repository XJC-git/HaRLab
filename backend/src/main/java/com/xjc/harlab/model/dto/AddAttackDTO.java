package com.xjc.harlab.model.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class AddAttackDTO {
    private int user_id;
    private Timestamp time;
    private String location;
}
