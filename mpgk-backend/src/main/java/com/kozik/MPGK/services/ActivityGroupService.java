package com.kozik.MPGK.services;



import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.repositories.ActivityGroupRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kozik.MPGK.exceptions.activityGroupExceptions.ActivityGroupAlreadyExistException;
import com.kozik.MPGK.exceptions.activityGroupExceptions.ActivityGroupNotFoundException;

@Service
public class ActivityGroupService {
    @Autowired private ActivityGroupRepository activityGroupRepository;

    public Iterable<ActivityGroup> listAll(){
        return activityGroupRepository.findAll();
    }

    public ActivityGroup save(ActivityGroup activityGroup) {
        if (activityGroup.getGroupId() != null) {
            throw new ActivityGroupAlreadyExistException(activityGroup.getGroupId());
        }
        return activityGroupRepository.save(activityGroup);
    }

    public ActivityGroup get(Long groupId) {
        ActivityGroup activityGroup = activityGroupRepository.findById(groupId).orElseThrow(() -> new ActivityGroupNotFoundException(groupId));
        return activityGroup;
    }

    public void delete(Long groupId) {
        activityGroupRepository.delete(get(groupId));
    }

    public Boolean isActivityGroupExist(Long id){
        return activityGroupRepository.existsById(id);
    }

    public ActivityGroup update(Long groupId, ActivityGroup activityGroup) {
        ActivityGroup newActivityGroup = activityGroupRepository.findById(groupId).map(element -> {
            element.setName(activityGroup.getName());
            element.setConnection(activityGroup.getConnection());
            return activityGroupRepository.save(element);
        }).orElseThrow(() -> new ActivityGroupNotFoundException(groupId));

        return newActivityGroup;
    }
}