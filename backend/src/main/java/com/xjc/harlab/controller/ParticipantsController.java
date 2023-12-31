package com.xjc.harlab.controller;

import com.xjc.harlab.model.dto.*;
import com.xjc.harlab.model.entity.Attacks;
import com.xjc.harlab.model.entity.Devices;
import com.xjc.harlab.model.entity.Participants;
import com.xjc.harlab.repository.AttacksRepository;
import com.xjc.harlab.repository.DevicesRepository;
import com.xjc.harlab.repository.ParticipantsRepository;
import com.xjc.harlab.response.Result;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.*;

@RestController
@Slf4j
@RequestMapping("/participants")
public class ParticipantsController {

    @Resource
    ParticipantsRepository participantsRepository;
    @Resource
    DevicesRepository devicesRepository;
    @Resource
    AttacksRepository attacksRepository;

    @PostMapping()
    public Result addUserOrDevice(@RequestBody AddUserOrDeviceDTO addUserOrDeviceDTO){
        if(addUserOrDeviceDTO.getUsername()==null ||
                addUserOrDeviceDTO.getUsername().isEmpty() ||
                addUserOrDeviceDTO.getUuid()==null ||
                addUserOrDeviceDTO.getUuid().isEmpty()
        ){
            return Result.paramError("invalid param");
        }
        Participants current = participantsRepository.findByUsername(addUserOrDeviceDTO.getUsername());
        if(current==null){
            Participants participant = new Participants();
            participant.setUsername(addUserOrDeviceDTO.getUsername());
            participantsRepository.save(participant);
            current = participant;
            Devices devices = new Devices();
            devices.setUserId(participant.getId());
            devices.setUuid(addUserOrDeviceDTO.getUuid());
            devicesRepository.save(devices);
        }
        else{
            List<Devices> devices = devicesRepository.findByUserId(current.getId());
            for(Devices d: devices){
                if(Objects.equals(d.getUuid(), addUserOrDeviceDTO.getUuid())){
                    return Result.success(current.getId(),"already registered");
                }
            }
            Devices addTo = new Devices();
            addTo.setUserId(current.getId());
            addTo.setUuid(addUserOrDeviceDTO.getUuid());
            devicesRepository.save(addTo);
        }
        return Result.success(current.getId(),"add success");
    }


    @PostMapping("/addAttack")
    public Result<String> addAttack(@RequestBody AddAttackDTO addAttackDTO){
        Optional<Participants> current =  participantsRepository.findById(addAttackDTO.getUser_id());
        if(current.isEmpty()) return Result.forbidden("participant unknown");
        Attacks attack = new Attacks();
        attack.setUserId(addAttackDTO.getUser_id());
        attack.setTime(addAttackDTO.getTime());
        attack.setLocation(addAttackDTO.getLocation());
        try {
            attacksRepository.save(attack);
        } catch (Exception e) {
            Result.paramError("invalid param");
        }
        return Result.success("add success");
    }

    @PostMapping("/deleteAttack")
    public Result<String> deleteAttack(@RequestBody DeleteAttackDTO deleteAttackDTO){
        Optional<Attacks> target = attacksRepository.findById(deleteAttackDTO.getId());
        target.ifPresent(attacks -> attacksRepository.delete(attacks));
        return Result.success("delete success");
    }

    @PostMapping("/editAttack")
    public Result<String> addAttack(@RequestBody EditAttackDTO editAttackDTO){
        Attacks attack = attacksRepository.getReferenceById(editAttackDTO.getId());
        attack.setId(editAttackDTO.getId());
        attack.setTime(editAttackDTO.getTime());
        attack.setLocation(editAttackDTO.getLocation());
        try {
            attacksRepository.save(attack);
        } catch (Exception e) {
            Result.paramError("invalid param");
        }
        return Result.success("add success");
    }

    @PostMapping("/todayAttacks")
    public Result todayAttacks(@RequestBody TodayAttacksDTO todayAttacksDTO){
        BigInteger startTime = todayAttacksDTO.getTime();
        BigInteger endTime = startTime.add(BigInteger.valueOf((24 * 60)*60* 1000));
        System.out.println(endTime);
        Collection<Attacks> query_result = attacksRepository.getAttacksForParticipants(todayAttacksDTO.getUser_id(), startTime,endTime);
        return Result.success(
                query_result,
                "query success");
    }

    @PostMapping("/weekAttacks")
    public Result weekAttacks(@RequestBody TodayAttacksDTO todayAttacksDTO){
        BigInteger endDay = todayAttacksDTO.getTime();
        BigInteger[] startTimeList = new BigInteger[7];
        BigInteger[] endTimeList = new BigInteger[7];
        for (int i = 0; i < startTimeList.length; i++) {
            startTimeList[i] = endDay.add(BigInteger.valueOf((-i*24 * 60)*60* 1000));
            endTimeList[i] = startTimeList[i].add(BigInteger.valueOf((24 * 60)*60* 1000));
        }
        Map<String,Object> result = new HashMap<>();
        List<Collection<Attacks>> data = new ArrayList<>();
        List<BigInteger> date = new ArrayList<>();
        List<Integer> count = new ArrayList<>();
        for (int i = 6; i>=0 ; i--) {
            Collection<Attacks> query_result = attacksRepository.getAttacksForParticipants(todayAttacksDTO.getUser_id(),startTimeList[i],endTimeList[i]);
            data.add(query_result);
            date.add(startTimeList[i]);
            count.add(query_result.size());
        }
        result.put("data",data);
        result.put("date",date);
        result.put("count",count);
        return Result.success(result,"query success");
    }

    @PostMapping("/allAttacks")
    public Result allAttacks(@RequestBody AllAttacksDTO allAttacksDTO){
        Pageable paging = PageRequest.of(allAttacksDTO.getPage(),allAttacksDTO.getSize(),Sort.Direction.DESC,"time");
        return Result.success(attacksRepository.findAllByUserId(paging,allAttacksDTO.getUserId()),"query success");
    }





}
