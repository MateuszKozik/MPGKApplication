package com.kozik.MPGK.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.exceptions.EmptyListException;
import com.kozik.MPGK.repositories.ActivityGroupRepository;
import com.kozik.MPGK.repositories.ConnectionRepository;
import com.kozik.MPGK.repositories.OverviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import static java.time.temporal.TemporalAdjusters.previous;

import java.time.DayOfWeek;

@Service
public class TaskService {

    @Autowired
    private ActivityGroupRepository activityGroupRepository;

    @Autowired
    private OverviewService overviewService;

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private OverviewRepository overviewRepository;

    @Autowired
    private ConnectionRepository connectionRepository;

    // Every minute
    @Scheduled(cron = "0 * * ? * *")
    // Every 15 minutes
    // @Scheduled(cron = "0 */15 * ? * *")
    public void check() {

        System.out.println("Sprawdzono " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));

        // check daily overviews
        for (Connection connection : connectionRepository.findByOverviewTypeName("Codziennie")) {
            Overview overview = overviewRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);

            if (overview != null) {
                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(overview.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {
                    System.out.println("Wygenerowano " + connection.getName());
                    daily(connection.getConnectionId());
                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            } else {
                daily(connection.getConnectionId());
            }
        }

        // check weekly overviews
        for (Connection connection : connectionRepository.findByOverviewTypeName("Raz w tygodniu")) {

            Overview overview = overviewRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
            if (overview != null) {

                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(overview.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {
                    System.out.println("Wygenerowano " + connection.getName());

                    weekly(connection.getConnectionId());

                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            } else {
                weekly(connection.getConnectionId());
            }
        }

    }

    // Set overview status to overdue after the end time
    public void setOverdue(Long connectionId) {
        List<ActivityGroup> groupList = activityGroupRepository.findByConnectionConnectionId(connectionId);
        for (ActivityGroup activityGroup : groupList) {
            List<Overview> overviews = overviewRepository
                    .findByActivityActivityGroupAndEndTimeLessThanAndStatus(activityGroup, LocalDateTime.now(), "Nowy");
            for (Overview overview : overviews) {
                overview.setStatus("Zaległy");
                overviewService.update(overview.getOverviewId(), overview);
            }
        }
    }

    // Daily overviews
    public void daily(Long connectionId) {

        // Change status of overdue daily overviews
        setOverdue(connectionId);

        // Generate daily overviews
        List<ActivityGroup> groupList = activityGroupRepository
                .findByConnectionConnectionIdAndConnectionDeviceStatus(connectionId, true);

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();

            for (Activity activity : activities) {
                LocalDateTime start = LocalDateTime.parse(LocalDateTime.now().toLocalDate().toString() + "T00:01");
                Overview overview = new Overview();
                overview.setStatus("Nowy");
                overview.setStartTime(start.toString());
                overview.setEndTime(start.plusDays(1).minusMinutes(2).toString());
                overview.setActivity(activity);
                overviewService.save(overview);
            }
        }
    }

    // Weekly overviews
    public void weekly(Long connectionId) {

        // Change status of overdue weekly overviews
        setOverdue(connectionId);

        List<ActivityGroup> groupList = activityGroupRepository
                .findByConnectionConnectionIdAndConnectionDeviceStatus(connectionId, true);

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();

            for (Activity activity : activities) {
                Overview overview = new Overview();

                LocalDateTime now = LocalDateTime.now();
                if (now.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
                    LocalDateTime startTime = LocalDateTime.parse(now.toLocalDate().toString() + "T00:01");
                    overview.setStartTime(startTime.toString());
                    LocalDateTime endTime = startTime.plusWeeks(1).minusMinutes(2);
                    overview.setEndTime(endTime.toString());

                } else {
                    now = now.with(previous(DayOfWeek.MONDAY));
                    LocalDateTime startTime = LocalDateTime.parse(now.toLocalDate().toString() + "T00:01");
                    overview.setStartTime(startTime.toString());
                    LocalDateTime endTime = startTime.plusWeeks(1).minusMinutes(2);
                    overview.setEndTime(endTime.toString());
                }

                overview.setStatus("Nowy");
                overview.setActivity(activity);
                overviewService.save(overview);
            }
        }
    }

    // Overview every day on the day shift
    public void dayShift(Long connectionId) {
        // ?
    }

    // Overview every two months
    public void everyTwoMonths(Long connectionId) {
        List<ActivityGroup> groupList = activityGroupRepository
                .findByConnectionOverviewTypeNameAndConnectionDeviceStatus("Raz na dwa miesiące", true);
        if (groupList.isEmpty()) {
            throw new EmptyListException("Activity group");
        }

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();

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
    public void yearly(Long connectionId) {
        List<ActivityGroup> groupList = activityGroupRepository
                .findByConnectionOverviewTypeNameAndConnectionDeviceStatus("Raz w roku", true);
        if (groupList.isEmpty()) {
            throw new EmptyListException("Activity group");
        }

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();

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
    public void onDemand(Long connectionId) {
        Connection connection = connectionService.get(connectionId);
        List<ActivityGroup> groupList = activityGroupRepository
                .findByConnectionOverviewTypeNameAndConnectionDeviceStatusAndConnection("Na żądanie", true, connection);
        if (groupList.isEmpty()) {
            throw new EmptyListException("Activity group");
        }

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();

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