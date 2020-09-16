package com.kozik.MPGK.services;

import java.util.ArrayList;
import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.repositories.ActivityGroupRepository;
import com.kozik.MPGK.repositories.ActivityRepository;
import com.kozik.MPGK.utilities.ActivityObject;
import com.kozik.MPGK.exceptions.activityExceptions.ActivityAlreadyExistException;
import com.kozik.MPGK.exceptions.activityExceptions.ActivityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private ActivityGroupRepository activityGroupRepository;

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

    public ArrayList<ActivityObject> getActivitiesByConnection(Long connectionId) {
        Connection connection = connectionService.get(connectionId);
        List<ActivityGroup> groups = activityGroupRepository.findByConnection(connection);

        ArrayList<ActivityObject> activityObjects = new ArrayList<>();
        for (ActivityGroup group : groups) {
            List<Activity> activities = activityRepository.findByActivityGroup(group);
            Integer countEmsr = 0;
            Integer countSetting = 0;
            for (Activity activity : activities) {
                if (!activity.getEmsr().isEmpty()) {
                    countEmsr++;
                }
                if (!activity.getSetting().isEmpty()) {
                    countSetting++;
                }
            }
            ActivityObject activityObject = new ActivityObject();
            if (countEmsr > 0) {
                activityObject.setShowEmsr(true);
            }
            if (countSetting > 0) {
                activityObject.setShowSetting(true);
            }
            activityObject.setActivities(activities);
            activityObject.setActivityGroup(group);
            activityObjects.add(activityObject);
        }
        return activityObjects;
    }
}