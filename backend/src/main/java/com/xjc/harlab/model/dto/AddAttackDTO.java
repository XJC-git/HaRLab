package com.xjc.harlab.model.dto;

import lombok.Data;

import java.math.BigInteger;
import java.sql.Timestamp;

@Data
public class AddAttackDTO {
    private int user_id;
    private BigInteger time;
    private String location;
}
