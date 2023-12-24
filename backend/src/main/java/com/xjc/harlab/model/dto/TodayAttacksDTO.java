package com.xjc.harlab.model.dto;

import lombok.Data;

import java.math.BigInteger;
import java.sql.Timestamp;

@Data
public class TodayAttacksDTO {
    private BigInteger time;
    private int user_id;
}
