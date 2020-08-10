package com.kozik.MPGK.services;

import java.time.LocalDateTime;
import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.repositories.ActivityGroupRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private ActivityGroupRepository activityGroupRepository;

    @Autowired
    private OverviewService overviewService;

    // Daily overviews
    public void daily() {
        List<ActivityGroup> groupList = activityGroupRepository.findByConnectionOverviewTypeName("Codziennie");
        if (groupList.isEmpty()) {
            // Exception
        }

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();
            if (activities.isEmpty()) {
                // Exception
            }
            for (Activity activity : activities) {
                Overview overview = new Overview();
                overview.setStatus("Nowy");
                overview.setStartTime(LocalDateTime.now().toString());
                overview.setEndTime(LocalDateTime.now().plusDays(1).toString());
                overview.setActivity(activity);
                overviewService.save(overview);
            }
        }
    }

    // Weekly overviews
    public void weekly() {
        List<ActivityGroup> groupList = activityGroupRepository.findByConnectionOverviewTypeName("Raz w tygodniu");
        if (groupList.isEmpty()) {
            // Exception
        }

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();
            if (activities.isEmpty()) {
                // Exception
            }
            for (Activity activity : activities) {
                Overview overview = new Overview();
                overview.setStatus("Nowy");
                overview.setStartTime(LocalDateTime.now().toString());
                overview.setEndTime(LocalDateTime.now().plusWeeks(1).toString());
                overview.setActivity(activity);
                overviewService.save(overview);
            }
        }
    }

    // Overview every day on the day shift
    public void dayShift() {
        // ?
    }

    // Overview every two months
    public void everyTwoMonths() {
        List<ActivityGroup> groupList = activityGroupRepository.findByConnectionOverviewTypeName("Raz na dwa miesiące");
        if (groupList.isEmpty()) {
            // Exception
        }

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();
            if (activities.isEmpty()) {
                // Exception
            }
            for (Activity activity : activities) {
                Overview overview = new Overview();
                overview.setStatus("Nowy");
                overview.setStartTime(LocalDateTime.now().toString());
                overview.setEndTime(LocalDateTime.now().plusMonths(2).toString());
                overview.setActivity(activity);
                overviewService.save(overview);
            }
        }
    }

    // Yearly overview
    public void yearly() {
        List<ActivityGroup> groupList = activityGroupRepository.findByConnectionOverviewTypeName("Raz w roku");
        if (groupList.isEmpty()) {
            // Exception
        }

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();
            if (activities.isEmpty()) {
                // Exception
            }
            for (Activity activity : activities) {
                Overview overview = new Overview();
                overview.setStatus("Nowy");
                overview.setStartTime(LocalDateTime.now().toString());
                overview.setEndTime(LocalDateTime.now().plusYears(1).toString());
                overview.setActivity(activity);
                overviewService.save(overview);
            }
        }
    }

    // Overview on demand
    public void onDemand() {
        List<ActivityGroup> groupList = activityGroupRepository.findByConnectionOverviewTypeName("Raz w roku");
        if (groupList.isEmpty()) {
            // Exception
        }

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();
            if (activities.isEmpty()) {
                // Exception
            }
            for (Activity activity : activities) {
                Overview overview = new Overview();
                overview.setStatus("Nowy");
                overview.setStartTime(LocalDateTime.now().toString());
                overview.setEndTime(LocalDateTime.now().plusMonths(2).toString());
                overview.setActivity(activity);
                overviewService.save(overview);
            }
        }
    }
}