package com.xjc.harlab.controller;

import com.xjc.harlab.model.dto.AddAttackDTO;
import com.xjc.harlab.model.dto.AddUserOrDeviceDTO;
import com.xjc.harlab.model.dto.TodayAttacksDTO;
import com.xjc.harlab.model.entity.Attacks;
import com.xjc.harlab.model.entity.Devices;
import com.xjc.harlab.model.entity.Participants;
import com.xjc.harlab.repository.AttacksRepository;
import com.xjc.harlab.repository.DevicesRepository;
import com.xjc.harlab.repository.ParticipantsRepository;
import com.xjc.harlab.response.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/participants")
public class ParticipantsController {

    @Autowired
    ParticipantsRepository participantsRepository;
    @Autowired
    DevicesRepository devicesRepository;
    @Autowired
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

    @PostMapping("/todayAttacks")
    public Result todayAttacks(@RequestBody TodayAttacksDTO todayAttacksDTO){
        BigInteger startTime = todayAttacksDTO.getTime();
        BigInteger endTime = startTime.add(BigInteger.valueOf((24 * 60)*60* 1000));
        System.out.println(endTime);
        return Result.success(
                attacksRepository.getAttacksForParticipants(todayAttacksDTO.getUser_id(), startTime,endTime),
                "query success");
    }

}
