package com.xjc.harlab.controller;

import com.xjc.harlab.model.dto.AddUserOrDeviceDTO;
import com.xjc.harlab.model.entity.Devices;
import com.xjc.harlab.model.entity.Participants;
import com.xjc.harlab.repository.DevicesRepository;
import com.xjc.harlab.repository.ParticipantsRepository;
import com.xjc.harlab.response.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@Slf4j
@RequestMapping("/participants")
public class ParticipantsController {

    @Autowired
    ParticipantsRepository participantsRepository;
    @Autowired
    DevicesRepository devicesRepository;

    @PostMapping()
    public Result<String> addUserOrDevice(@RequestBody AddUserOrDeviceDTO addUserOrDeviceDTO){
        Participants current = participantsRepository.findByUsername(addUserOrDeviceDTO.getUsername());
        if(current==null){
            Participants participant = new Participants();
            participant.setUsername(addUserOrDeviceDTO.getUsername());
            participantsRepository.save(participant);
            Devices devices = new Devices();
            devices.setUserId(participant.getId());
            devices.setUuid(addUserOrDeviceDTO.getUuid());
            devicesRepository.save(devices);
        }
        else{
            List<Devices> devices = devicesRepository.findByUserId(current.getId());
            for(Devices d: devices){
                if(Objects.equals(d.getUuid(), addUserOrDeviceDTO.getUuid())){
                    return Result.failed("already registered");
                }
            }
            Devices addTo = new Devices();
            addTo.setUserId(current.getId());
            addTo.setUuid(addUserOrDeviceDTO.getUuid());
            devicesRepository.save(addTo);
        }
        return Result.success("add success");
    }

}
