package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.repositories.ActivityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {
    @Autowired private ActivityRepository activityRepository;

    public List<Activity> listAll(){
        return activityRepository.findAll();
    }

    public void save(Activity activity){
        activityRepository.save(activity);
    }

    public Activity get(Long id){
        return activityRepository.findById(id).get();
    }

    public void delete(Long id){
        activityRepository.deleteById(id);
    }
}