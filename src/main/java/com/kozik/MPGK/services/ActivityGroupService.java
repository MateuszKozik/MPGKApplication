package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.repositories.ActivityGroupRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityGroupService {
    @Autowired private ActivityGroupRepository activityGroupRepository;

    public List<ActivityGroup> listAll(){
        return activityGroupRepository.findAll();
    }

    public void save(ActivityGroup activityGroup){
        activityGroupRepository.save(activityGroup);
    }

    public ActivityGroup get(Long id){
        return activityGroupRepository.findById(id).get();
    }

    public void delete(Long id){
        activityGroupRepository.deleteById(id);
    }
}