package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.repositories.ActivityRepository;
import com.kozik.MPGK.exceptions.activityExceptions.ActivityAlreadyExistException;
import com.kozik.MPGK.exceptions.activityExceptions.ActivityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository activityRepository;

    public Iterable<Activity> listAll() {
        return activityRepository.findAll();
    }

    public Activity save(Activity activity) {
        if (activity.getActivityId() != null) {
            throw new ActivityAlreadyExistException(activity.getActivityId());
        }
        return activityRepository.save(activity);
    }

    public Activity get(Long activityId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ActivityNotFoundException(activityId));
        return activity;
    }

    public void delete(Long activityId) {
        activityRepository.delete(get(activityId));
    }

    public Boolean isActivityExist(Long id) {
        return activityRepository.existsById(id);
    }

    public Activity update(Long activityId, Activity activity) {
        Activity newActivity = activityRepository.findById(activityId).map(element -> {
            element.setName(activity.getName());
            element.setType(activity.getType());
            element.setEmsr(activity.getEmsr());
            element.setListItems(activity.getListItems());
            element.setSetting(activity.getSetting());
            element.setActivityGroup(activity.getActivityGroup());
            return activityRepository.save(element);
        }).orElseThrow(() -> new ActivityNotFoundException(activityId));

        return newActivity;
    }
}