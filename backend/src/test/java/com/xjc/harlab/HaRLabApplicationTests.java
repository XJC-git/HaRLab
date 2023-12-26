package com.xjc.harlab;

import com.xjc.harlab.model.entity.Attacks;
import com.xjc.harlab.model.entity.Participants;
import com.xjc.harlab.repository.AttacksRepository;
import com.xjc.harlab.repository.ParticipantsRepository;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@SpringBootTest
class HaRLabApplicationTests {
    @Resource
    AttacksRepository attacksRepository;
    @Resource
    ParticipantsRepository participantsRepository;

    @Test
    void contextLoads() {
    }

    @Disabled
    @Test
    void dataGenerate(){
        List<Participants> allParticipants = participantsRepository.findAll();
        Date today = new Date();
        BigInteger endDay = BigInteger.valueOf(today.getTime());
        BigInteger[] startTimeList = new BigInteger[14];
        for (int i = 13; i >=0; i--) {
            startTimeList[i] = endDay.add(BigInteger.valueOf(((i-13)*24 * 60)*60* 1000));
        }
        Random random = new Random();
        int alertCount = 3;
        List<Attacks> result = new ArrayList<>();
        for(Participants participant:allParticipants){
            int endGenDay = 14;
            if(alertCount>0){
                endGenDay = 11;
                alertCount--;
            }
            for (int i =0;i<endGenDay;i++){
                int recordCount = random.nextInt(5)+2;
                while(recordCount-->0){
                    Attacks attack = new Attacks();
                    attack.setUserId(participant.getId());
                    int hour = random.nextInt(24);
                    int minute = random.nextInt(60);
                    BigInteger time = startTimeList[i].add(BigInteger.valueOf(hour*60*60*1000+minute*60*1000));
                    attack.setTime(time);
                    int loc = random.nextInt(2);
                    if(loc==1){
                        attack.setLocation("inside");
                    }
                    else{
                        attack.setLocation("outside");
                    }
                    result.add(attack);
                }

            }


        }
        attacksRepository.saveAll(result);
    }
}
