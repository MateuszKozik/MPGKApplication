package com.kozik.MPGK.services;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;

import java.time.format.DateTimeFormatter;
import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.repositories.ActivityGroupRepository;
import com.kozik.MPGK.repositories.ConnectionRepository;
import com.kozik.MPGK.repositories.OverviewRepository;
import com.kozik.MPGK.utilities.GenerateOverviewValue;
import com.kozik.MPGK.utilities.OverviewMonths;

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

        System.out
                .println("\nSprawdzono " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));

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

        // Check every two months overviews
        for (Connection connection : connectionRepository.findByOverviewTypeName("Raz na dwa miesiące")) {

            Overview overview = overviewRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
            if (overview != null) {

                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(overview.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {

                    everyTwoMonths(connection.getConnectionId());

                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            } else {
                everyTwoMonths(connection.getConnectionId());
            }
        }

        // check yearly overviews
        for (Connection connection : connectionRepository.findByOverviewTypeName("Raz w roku")) {

            Overview overview = overviewRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
            if (overview != null) {

                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(overview.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {

                    yearly(connection.getConnectionId());

                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            }
        }

        // Check on demand overviews
        for (Connection connection : connectionRepository.findByOverviewTypeName("Na żądanie")) {

            Overview overview = overviewRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
            if (overview != null) {

                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(overview.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {

                    setOverdue(connection.getConnectionId());
                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            }
        }

        // Check the day shift overviews
        for (Connection connection : connectionRepository.findByOverviewTypeName("Codziennie na dziennej zmianie")) {

            Overview overview = overviewRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
            if (overview != null) {

                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(overview.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {

                    dayShift(connection.getConnectionId());

                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            } else {
                dayShift(connection.getConnectionId());
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
        if (!groupList.isEmpty()) {

            // This class takes values from yesterday's overview and generates the
            // parameters for today's review based on the given activity
            GenerateOverviewValue overviewParameters = new GenerateOverviewValue(
                    overviewRepository.findFirstByActivityNameOrderByEndTimeDesc(
                            "Wpisać numery sekcji wężownicy kotła (z pokrywy górnej kotła), które zostały oczyszczone podczas bieżącej zmiany."));

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

            // Assign generated parameters to the overviews
            overviewService.setOverviewParameter(
                    "Informacja dla bieżącej zmiany: numery sekcji kotła oczyszczone na poprzedniej zmianie.",
                    overviewParameters.getYesterdayValue(), "Wygenerowane");
            overviewService.setOverviewParameter(
                    "Informacja dla bieżącej zmiany: numery sekcji kotła, które należy oczyścić na bieżącej zmianie.",
                    overviewParameters.getTodayValue(), "Wygenerowane");
        }

    }

    // Weekly overviews
    public void weekly(Long connectionId) {

        // Change status of overdue weekly overviews
        setOverdue(connectionId);

        // Generate weekly overviews
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

        // Change status of overdue the day shift overviews
        setOverdue(connectionId);

        // Generate day shift overviews
        if (LocalTime.now().isAfter(LocalTime.of(6, 0)) && LocalTime.now().isBefore(LocalTime.of(18, 0))) {
            if (connectionService.get(connectionId).getDevice().getStatus()) {
                System.out.println("Wygenerowano " + connectionService.get(connectionId).getName());
            }

            List<ActivityGroup> groupList = activityGroupRepository
                    .findByConnectionConnectionIdAndConnectionDeviceStatus(connectionId, true);

            for (ActivityGroup activityGroup : groupList) {
                List<Activity> activities = activityGroup.getActivities();

                for (Activity activity : activities) {
                    LocalDateTime start = LocalDateTime.parse(LocalDateTime.now().toLocalDate().toString() + "T06:00");
                    Overview overview = new Overview();
                    overview.setStatus("Nowy");
                    overview.setStartTime(start.toString());
                    overview.setEndTime(start.plusHours(12).toString());
                    overview.setActivity(activity);
                    overviewService.save(overview);
                }
            }
        }

    }

    // Overview every two months
    public void everyTwoMonths(Long connectionId) {

        // Change status of overdue weekly overviews
        setOverdue(connectionId);

        // Generate every two months overviews
        List<Month> months = new OverviewMonths().getMonths();

        LocalDateTime now = LocalDateTime.now();
        for (Month month : months) {
            if (now.getMonth().equals(month)) {
                if (connectionService.get(connectionId).getDevice().getStatus()) {
                    System.out.println("Wygenerowano " + connectionService.get(connectionId).getName());
                }

                List<ActivityGroup> groupList = activityGroupRepository
                        .findByConnectionConnectionIdAndConnectionDeviceStatus(connectionId, true);
                for (ActivityGroup activityGroup : groupList) {
                    List<Activity> activities = activityGroup.getActivities();

                    for (Activity activity : activities) {
                        Overview overview = new Overview();

                        LocalDateTime startTime;
                        if (now.getMonth().getValue() < 10) {
                            startTime = LocalDateTime
                                    .parse(now.getYear() + "-0" + now.getMonth().getValue() + "-01T00:01");
                        } else {
                            startTime = LocalDateTime
                                    .parse(now.getYear() + "-" + now.getMonth().getValue() + "-01T00:01");
                        }
                        LocalDateTime endTime = startTime.plusMonths(1).minusMinutes(2);

                        overview.setStatus("Nowy");
                        overview.setStartTime(startTime.toString());
                        overview.setEndTime(endTime.toString());
                        overview.setActivity(activity);
                        overviewService.save(overview);
                    }
                }

            }
        }

    }

    // Yearly overview
    public void yearly(Long connectionId) {

        // Change status of overdue yearly overviews
        setOverdue(connectionId);

        // Calculate date of next overview
        Overview testOverview = overviewRepository
                .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connectionService.get(connectionId));
        LocalDateTime next;
        if (testOverview != null) {
            next = LocalDateTime.parse(testOverview.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME).plusMonths(9);
        } else {
            next = LocalDateTime.now().minusMinutes(1);
        }

        // Generate next overview
        if (LocalDateTime.now().isAfter(next)) {
            if (connectionService.get(connectionId).getDevice().getStatus()) {
                System.out.println("Wygenerowano " + connectionService.get(connectionId).getName());
            }
            List<ActivityGroup> groupList = activityGroupRepository
                    .findByConnectionConnectionIdAndConnectionDeviceStatus(connectionId, true);

            for (ActivityGroup activityGroup : groupList) {
                List<Activity> activities = activityGroup.getActivities();

                for (Activity activity : activities) {
                    LocalDateTime start = LocalDateTime.parse(LocalDateTime.now().toLocalDate().toString() + "T00:01");
                    Overview overview = new Overview();
                    overview.setStatus("Nowy");
                    overview.setStartTime(start.toString());
                    overview.setEndTime(start.plusMonths(3).minusMinutes(2).toString());
                    overview.setActivity(activity);
                    overviewService.save(overview);
                }
            }
        }
    }

    // Overview on demand
    public void onDemand(Long connectionId) {

        List<ActivityGroup> groupList = activityGroupRepository
                .findByConnectionConnectionIdAndConnectionDeviceStatus(connectionId, true);

        for (ActivityGroup activityGroup : groupList) {
            List<Activity> activities = activityGroup.getActivities();

            for (Activity activity : activities) {
                LocalDateTime start = LocalDateTime.parse(LocalDateTime.now().toLocalDate().toString() + "T00:01");
                Overview overview = new Overview();
                overview.setStatus("Nowy");
                overview.setStartTime(start.toString());
                overview.setEndTime(start.plusMonths(2).minusMinutes(2).toString());
                overview.setActivity(activity);
                overviewService.save(overview);
            }
        }
    }
}