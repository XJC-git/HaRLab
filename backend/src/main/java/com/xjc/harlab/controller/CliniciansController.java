package com.xjc.harlab.controller;

import com.xjc.harlab.anotation.Login;
import com.xjc.harlab.model.dto.ParticipantsListDTO;
import com.xjc.harlab.model.dto.RegisterClinicianDTO;
import com.xjc.harlab.model.entity.Clinicians;
import com.xjc.harlab.repository.AttacksRepository;
import com.xjc.harlab.repository.CliniciansRepository;
import com.xjc.harlab.response.Result;
import com.xjc.harlab.utils.EncryptionUtils;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/clinicians")
public class CliniciansController {
    @Resource
    AttacksRepository attacksRepository;
    @Resource
    CliniciansRepository cliniciansRepository;

    @PostMapping("/register")
    public Result<String> register(@RequestBody RegisterClinicianDTO registerClinicianDTO){
        if(registerClinicianDTO.getPassword().length()<6){
            return Result.paramError("password invalid (length < 6)");
        }
        Clinicians check_query = cliniciansRepository.findByUsername(registerClinicianDTO.getUsername());
        if(check_query!=null){
            return Result.paramError("username already registered");
        }
        Clinicians save_clinician = new Clinicians();
        String encryptedPassword = EncryptionUtils.encryptPassword(registerClinicianDTO.getPassword());
        save_clinician.setUsername(registerClinicianDTO.getUsername());
        save_clinician.setPassword(encryptedPassword);
        cliniciansRepository.save(save_clinician);
        return Result.success("register success");
    }

    @PostMapping("/login")
    public Result<String> login(@RequestBody RegisterClinicianDTO loginClinicianDTO){
        String encryptedPassword = EncryptionUtils.encryptPassword(loginClinicianDTO.getPassword());
        Optional<Clinicians> query_result = cliniciansRepository.loginQuery(loginClinicianDTO.getUsername(),encryptedPassword);
        if(query_result.isPresent()){
            String token = EncryptionUtils.generateToken(query_result.get());
            return Result.success(token,"login success");
        }
        return Result.paramError("incorrect username or password");
    }

    @Login
    @PostMapping("/participants-list")
    public Result participantsList(@RequestBody ParticipantsListDTO participantsListDTO){
        return Result.success(attacksRepository.getParticipantsWithAlert(participantsListDTO.getDate()),"query success");
    }
}
