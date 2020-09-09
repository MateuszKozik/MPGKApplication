package com.kozik.MPGK.services;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;

import java.time.format.DateTimeFormatter;
import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Inspection;
import com.kozik.MPGK.repositories.ActivityGroupRepository;
import com.kozik.MPGK.repositories.ConnectionRepository;
import com.kozik.MPGK.repositories.InspectionRepository;
import com.kozik.MPGK.utilities.GenerateInspectionValue;
import com.kozik.MPGK.utilities.InspectionMonths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.time.temporal.TemporalAdjusters.previous;

import java.time.DayOfWeek;

@Service
public class TaskService {

    @Autowired
    private ActivityGroupRepository activityGroupRepository;

    @Autowired
    private InspectionService inspectionService;

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private InspectionRepository inspectionRepository;

    @Autowired
    private ConnectionRepository connectionRepository;

    // The method will be called every 15 minutes
    @Scheduled(cron = "0 */15 * ? * *")
    @Transactional
    public void check() {

        System.out
                .println("\nSprawdzono " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));

        // check daily inspections
        for (Connection connection : connectionRepository.findByInspectionTypeName("Codziennie")) {
            Inspection inspection = inspectionRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);

            if (inspection != null) {
                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(inspection.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {
                    daily(connection.getConnectionId());
                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            } else {
                daily(connection.getConnectionId());
            }
        }

        // check weekly inspections
        for (Connection connection : connectionRepository.findByInspectionTypeName("Raz w tygodniu")) {

            Inspection inspection = inspectionRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
            if (inspection != null) {
                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(inspection.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {
                    weekly(connection.getConnectionId());
                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            } else {
                weekly(connection.getConnectionId());
            }
        }

        // Check every two months inspections
        for (Connection connection : connectionRepository.findByInspectionTypeName("Raz na dwa miesiące")) {

            Inspection inspection = inspectionRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
            if (inspection != null) {
                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(inspection.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {
                    everyTwoMonths(connection.getConnectionId());
                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            } else {
                everyTwoMonths(connection.getConnectionId());
            }
        }

        // Check yearly inspections
        for (Connection connection : connectionRepository.findByInspectionTypeName("Raz w roku")) {

            Inspection inspection = inspectionRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
            if (inspection != null) {
                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(inspection.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {
                    yearly(connection.getConnectionId());
                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            }
        }

        // Check on demand inspections
        for (Connection connection : connectionRepository.findByInspectionTypeName("Na żądanie")) {

            Inspection inspection = inspectionRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
            if (inspection != null) {
                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(inspection.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {
                    setOverdue(connection.getConnectionId());
                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            }
        }

        // Check the day shift inspections
        for (Connection connection : connectionRepository.findByInspectionTypeName("Codziennie na dziennej zmianie")) {

            Inspection inspection = inspectionRepository
                    .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
            if (inspection != null) {
                if (LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(inspection.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {
                    dayShift(connection.getConnectionId());
                } else {
                    System.out.println(connection.getName() + " jest aktualny");
                }
            } else {
                dayShift(connection.getConnectionId());
            }
        }

    }

    // Set inspection status to overdue after the end time
    public void setOverdue(Long connectionId) {
        List<ActivityGroup> groupList = activityGroupRepository.findByConnectionConnectionId(connectionId);
        for (ActivityGroup activityGroup : groupList) {
            List<Inspection> inspections = inspectionRepository
                    .findByActivityActivityGroupAndEndTimeLessThanAndStatus(activityGroup, LocalDateTime.now(), "Nowy");
            for (Inspection inspection : inspections) {
                inspection.setStatus("Zaległy");
                inspectionService.generateOverdue(inspection.getInspectionId(), inspection);
            }
        }
    }

    // Daily inspections
    public void daily(Long connectionId) {

        // Change status of overdue daily inspections
        setOverdue(connectionId);

        // Check if the device is working
        if ((connectionService.get(connectionId).getDevice().getStatus())) {

            List<ActivityGroup> groupList = activityGroupRepository
                    .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

            if (!groupList.isEmpty()) {

                // This class takes values from yesterday's inspection and generates the
                // parameters for today's review based on the given activity
                GenerateInspectionValue inspectionParameters = new GenerateInspectionValue();
                if (connectionService.get(connectionId).getName().equals("Przegląd codzienny ORC")) {
                    inspectionParameters = new GenerateInspectionValue(
                            inspectionRepository.findFirstByActivityNameOrderByEndTimeDesc(
                                    "Wpisać numery sekcji wężownicy kotła (z pokrywy górnej kotła), które zostały oczyszczone podczas bieżącej zmiany."));
                }

                // Generate daily inspections
                System.out.println("Wygenerowano " + connectionService.get(connectionId).getName());
                for (ActivityGroup activityGroup : groupList) {
                    List<Activity> activities = activityGroup.getActivities();

                    for (Activity activity : activities) {
                        LocalDateTime start = LocalDateTime
                                .parse(LocalDateTime.now().toLocalDate().toString() + "T00:01");
                        Inspection inspection = new Inspection();
                        inspection.setStatus("Nowy");
                        inspection.setStartTime(start.toString());
                        inspection.setEndTime(start.plusDays(1).minusMinutes(2).toString());
                        inspection.setActivity(activity);
                        inspectionService.save(inspection);
                    }
                }

                // Assign generated parameters to the inspections
                if (connectionService.get(connectionId).getName().equals("Przegląd codzienny ORC")) {
                    inspectionService.setInspectionParameter(
                            "Informacja dla bieżącej zmiany: numery sekcji kotła oczyszczone na poprzedniej zmianie.",
                            inspectionParameters.getYesterdayValue(), "Wygenerowane");
                    inspectionService.setInspectionParameter(
                            "Informacja dla bieżącej zmiany: numery sekcji kotła, które należy oczyścić na bieżącej zmianie.",
                            inspectionParameters.getTodayValue(), "Wygenerowane");
                }

            }
        }
    }

    // Weekly inspections
    public void weekly(Long connectionId) {

        // Change status of overdue weekly inspections
        setOverdue(connectionId);

        // Check if the device is working
        if ((connectionService.get(connectionId).getDevice().getStatus())) {

            // Generate weekly inspections
            List<ActivityGroup> groupList = activityGroupRepository
                    .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

            if (!groupList.isEmpty()) {
                System.out.println("Wygenerowano " + connectionService.get(connectionId).getName());
                for (ActivityGroup activityGroup : groupList) {
                    List<Activity> activities = activityGroup.getActivities();

                    for (Activity activity : activities) {
                        Inspection inspection = new Inspection();

                        LocalDateTime now = LocalDateTime.now();
                        if (now.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
                            LocalDateTime startTime = LocalDateTime.parse(now.toLocalDate().toString() + "T00:01");
                            inspection.setStartTime(startTime.toString());
                            LocalDateTime endTime = startTime.plusWeeks(1).minusMinutes(2);
                            inspection.setEndTime(endTime.toString());

                        } else {
                            now = now.with(previous(DayOfWeek.MONDAY));
                            LocalDateTime startTime = LocalDateTime.parse(now.toLocalDate().toString() + "T00:01");
                            inspection.setStartTime(startTime.toString());
                            LocalDateTime endTime = startTime.plusWeeks(1).minusMinutes(2);
                            inspection.setEndTime(endTime.toString());
                        }

                        inspection.setStatus("Nowy");
                        inspection.setActivity(activity);
                        inspectionService.save(inspection);
                    }
                }
            }

        }
    }

    // Inspection every day on the day shift
    public void dayShift(Long connectionId) {

        // Change status of overdue the day shift inspections
        setOverdue(connectionId);

        if (LocalTime.now().isAfter(LocalTime.of(6, 0)) && LocalTime.now().isBefore(LocalTime.of(18, 0))) {

            // Check if the device is working
            if ((connectionService.get(connectionId).getDevice().getStatus())) {

                // Generate day shift inspections
                List<ActivityGroup> groupList = activityGroupRepository
                        .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

                if (!groupList.isEmpty()) {
                    System.out.println("Wygenerowano " + connectionService.get(connectionId).getName());

                    for (ActivityGroup activityGroup : groupList) {
                        List<Activity> activities = activityGroup.getActivities();

                        for (Activity activity : activities) {
                            LocalDateTime start = LocalDateTime
                                    .parse(LocalDateTime.now().toLocalDate().toString() + "T06:00");
                            Inspection inspection = new Inspection();
                            inspection.setStatus("Nowy");
                            inspection.setStartTime(start.toString());
                            inspection.setEndTime(start.plusHours(12).toString());
                            inspection.setActivity(activity);
                            inspectionService.save(inspection);
                        }
                    }
                }
            }
        }

    }

    // Inspection every two months
    public void everyTwoMonths(Long connectionId) {

        // Change status of overdue weekly inspections
        setOverdue(connectionId);

        List<Month> months = new InspectionMonths().getMonths();
        LocalDateTime now = LocalDateTime.now();
        for (Month month : months) {
            if (LocalDateTime.now().getMonth().equals(month)) {

                // Check if the device is working
                if ((connectionService.get(connectionId).getDevice().getStatus())) {

                    // Generate every two months inspections
                    List<ActivityGroup> groupList = activityGroupRepository
                            .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

                    if (!groupList.isEmpty()) {
                        System.out.println("Wygenerowano " + connectionService.get(connectionId).getName());
                        for (ActivityGroup activityGroup : groupList) {
                            List<Activity> activities = activityGroup.getActivities();

                            for (Activity activity : activities) {
                                Inspection inspection = new Inspection();

                                LocalDateTime startTime;
                                if (now.getMonth().getValue() < 10) {
                                    startTime = LocalDateTime
                                            .parse(now.getYear() + "-0" + now.getMonth().getValue() + "-01T00:01");
                                } else {
                                    startTime = LocalDateTime
                                            .parse(now.getYear() + "-" + now.getMonth().getValue() + "-01T00:01");
                                }
                                LocalDateTime endTime = startTime.plusMonths(1).minusMinutes(2);

                                inspection.setStatus("Nowy");
                                inspection.setStartTime(startTime.toString());
                                inspection.setEndTime(endTime.toString());
                                inspection.setActivity(activity);
                                inspectionService.save(inspection);
                            }
                        }
                    }

                }

            }
        }

    }

    // Yearly inspection
    public void yearly(Long connectionId) {

        // Change status of overdue yearly inspections
        setOverdue(connectionId);

        // Calculate date of next inspection
        Inspection testInspection = inspectionRepository
                .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connectionService.get(connectionId));
        LocalDateTime next;
        if (testInspection != null) {
            next = LocalDateTime.parse(testInspection.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME)
                    .plusMonths(9);
        } else {
            next = LocalDateTime.now().minusMinutes(1);
        }

        if (LocalDateTime.now().isAfter(next)) {

            // Check if the device is working
            if ((connectionService.get(connectionId).getDevice().getStatus())) {

                // Generate yearly inspection
                List<ActivityGroup> groupList = activityGroupRepository
                        .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

                if (!groupList.isEmpty()) {
                    System.out.println("Wygenerowano " + connectionService.get(connectionId).getName());
                    for (ActivityGroup activityGroup : groupList) {
                        List<Activity> activities = activityGroup.getActivities();

                        for (Activity activity : activities) {
                            LocalDateTime start = LocalDateTime
                                    .parse(LocalDateTime.now().toLocalDate().toString() + "T00:01");
                            Inspection inspection = new Inspection();
                            inspection.setStatus("Nowy");
                            inspection.setStartTime(start.toString());
                            inspection.setEndTime(start.plusMonths(3).minusMinutes(2).toString());
                            inspection.setActivity(activity);
                            inspectionService.save(inspection);
                        }
                    }
                }

            }
        }
    }

    // Inspection on demand
    public void onDemand(Long connectionId) {

        // Check if the device is working
        if ((connectionService.get(connectionId).getDevice().getStatus())) {

            // Generate on demand inspection
            List<ActivityGroup> groupList = activityGroupRepository
                    .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

            if (!groupList.isEmpty()) {
                System.out.println("Wygenerowano " + connectionService.get(connectionId).getName());
                for (ActivityGroup activityGroup : groupList) {
                    List<Activity> activities = activityGroup.getActivities();

                    for (Activity activity : activities) {
                        LocalDateTime start = LocalDateTime
                                .parse(LocalDateTime.now().toLocalDate().toString() + "T00:01");
                        Inspection inspection = new Inspection();
                        inspection.setStatus("Nowy");
                        inspection.setStartTime(start.toString());
                        inspection.setEndTime(start.plusMonths(2).minusMinutes(2).toString());
                        inspection.setActivity(activity);
                        inspectionService.save(inspection);
                    }
                }
            }
        }
    }
}