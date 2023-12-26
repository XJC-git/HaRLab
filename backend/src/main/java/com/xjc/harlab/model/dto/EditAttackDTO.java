package com.xjc.harlab.model.dto;

import lombok.Data;

import java.math.BigInteger;

@Data
public class EditAttackDTO {
    private int id;
    private BigInteger time;
    private String location;
}
