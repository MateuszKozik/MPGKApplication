package com.kozik.MPGK.services;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;
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

import java.security.Principal;
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

    @Autowired
    private PersonService personService;

    private static final List<String> inspectionTypes = Arrays.asList("Codziennie", "Raz w tygodniu",
            "Raz na dwa miesiące", "Raz w roku", "Na żądanie", "Codziennie na dziennej zmianie");

    private static final List<String> uncommonItems = Arrays.asList("Spuścić osady / szlam ze zbiornika (odstojnika).",
            "Sprawdzić działanie wentylatora powietrza świeżego do kondensacji (pod kątem hałasów i drgań), sprawdzić stan osłon i obudów.",
            "Sprawdzić/potwierdzić działanie pompy tłoczącej wodę z wanny do osadnika.");

    private static final String INSPECTION_COMPLETED = "Wykonany";
    private static final String INSPECTION_GENERATED = "Wygenerowane";
    private static final String NEW_INSPECTION = "Nowy";
    private static final String MINUTE_AFTER_MIDNIGHT = "T00:01";

    // The method will be called every 15 minutes
    @Scheduled(cron = "0 */15 * ? * *")
    @Transactional
    public void check() {
        for (String string : inspectionTypes) {
            for (Connection connection : connectionRepository.findByInspectionTypeName(string)) {
                Inspection inspection = inspectionRepository
                        .findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(connection);
                if (inspection != null && LocalDateTime.now()
                        .isAfter(LocalDateTime.parse(inspection.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))) {
                    if (string.equals("Codziennie")) {
                        daily(connection.getConnectionId());
                    } else if (string.equals("Raz w tygodniu")) {
                        weekly(connection.getConnectionId());
                    } else if (string.equals("Raz na dwa miesiące")) {
                        everyTwoMonths(connection.getConnectionId());
                    } else if (string.equals("Raz w roku")) {
                        yearly(connection.getConnectionId());
                    } else if (string.equals("Na żądanie")) {
                        setOverdue(connection.getConnectionId());
                    } else if (string.equals("Codziennie na dziennej zmianie")) {
                        dayShift(connection.getConnectionId());
                    }
                }
            }
        }

        // Set status uncommon inspections
        setUncommon();
    }

    public void setUncommon() {
        for (Inspection inspection : inspectionRepository.findByActivityNameAndStatusAndParameterAndEndTimeAfter(
                "Układ kondensacji spalin załączony?", INSPECTION_COMPLETED, "NIE",
                LocalDateTime.now().minusMonths(2))) {
            for (String item : uncommonItems) {
                Inspection inspectionItem = inspectionRepository.findByActivityNameAndEndTime(item,
                        LocalDateTime.parse(inspection.getEndTime()));
                if ((inspectionItem != null) && !inspectionItem.getStatus().equals(INSPECTION_COMPLETED)) {
                    inspectionItem.setComment("Układ wyłączony");
                    inspectionItem.setStatus(INSPECTION_COMPLETED);
                    inspectionService.updateWithoutPerson(inspectionItem.getInspectionId(), inspectionItem);
                }
            }
        }
    }

    // Set inspection status to overdue after the end time
    public void setOverdue(Long connectionId) {
        for (ActivityGroup activityGroup : activityGroupRepository.findByConnectionConnectionId(connectionId)) {
            for (Inspection inspection : inspectionRepository.findByActivityActivityGroupAndEndTimeLessThanAndStatus(
                    activityGroup, LocalDateTime.now(), NEW_INSPECTION)) {
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
        Boolean status = connectionService.get(connectionId).getDevice().getStatus();
        if (Boolean.TRUE.equals(status)) {

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
                for (ActivityGroup activityGroup : groupList) {
                    for (Activity activity : activityGroup.getActivities()) {
                        LocalDateTime start = LocalDateTime
                                .parse(LocalDateTime.now().toLocalDate().toString() + MINUTE_AFTER_MIDNIGHT);
                        Inspection inspection = new Inspection();
                        inspection.setStatus(NEW_INSPECTION);
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
                            inspectionParameters.getYesterdayValue(), INSPECTION_GENERATED);
                    inspectionService.setInspectionParameter(
                            "Informacja dla bieżącej zmiany: numery sekcji kotła, które należy oczyścić na bieżącej zmianie.",
                            inspectionParameters.getTodayValue(), INSPECTION_GENERATED);
                }

            }
        }
    }

    // Weekly inspections
    public void weekly(Long connectionId) {

        // Change status of overdue weekly inspections
        setOverdue(connectionId);

        // Check if the device is working
        Boolean status = connectionService.get(connectionId).getDevice().getStatus();
        if (Boolean.TRUE.equals(status)) {

            // Generate weekly inspections
            List<ActivityGroup> groupList = activityGroupRepository
                    .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

            if (!groupList.isEmpty()) {
                for (ActivityGroup activityGroup : groupList) {
                    for (Activity activity : activityGroup.getActivities()) {
                        Inspection inspection = new Inspection();

                        LocalDateTime now = LocalDateTime.now();
                        if (now.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
                            LocalDateTime startTime = LocalDateTime
                                    .parse(now.toLocalDate().toString() + MINUTE_AFTER_MIDNIGHT);
                            inspection.setStartTime(startTime.toString());
                            LocalDateTime endTime = startTime.plusWeeks(1).minusMinutes(2);
                            inspection.setEndTime(endTime.toString());

                        } else {
                            now = now.with(previous(DayOfWeek.MONDAY));
                            LocalDateTime startTime = LocalDateTime
                                    .parse(now.toLocalDate().toString() + MINUTE_AFTER_MIDNIGHT);
                            inspection.setStartTime(startTime.toString());
                            LocalDateTime endTime = startTime.plusWeeks(1).minusMinutes(2);
                            inspection.setEndTime(endTime.toString());
                        }
                        inspection.setStatus(NEW_INSPECTION);
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

        // Check if the device is working
        Boolean status = connectionService.get(connectionId).getDevice().getStatus();
        if (LocalTime.now().isAfter(LocalTime.of(6, 0)) && LocalTime.now().isBefore(LocalTime.of(18, 0))
                && Boolean.TRUE.equals(status)) {

            // Generate day shift inspections
            List<ActivityGroup> groupList = activityGroupRepository
                    .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

            if (!groupList.isEmpty()) {
                for (ActivityGroup activityGroup : groupList) {
                    for (Activity activity : activityGroup.getActivities()) {
                        LocalDateTime start = LocalDateTime
                                .parse(LocalDateTime.now().toLocalDate().toString() + "T06:00");
                        Inspection inspection = new Inspection();
                        inspection.setStatus(NEW_INSPECTION);
                        inspection.setStartTime(start.toString());
                        inspection.setEndTime(start.plusHours(12).toString());
                        inspection.setActivity(activity);
                        inspectionService.save(inspection);
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

        // Check if the device is working
        Boolean status = connectionService.get(connectionId).getDevice().getStatus();
        for (Month month : months) {
            if (LocalDateTime.now().getMonth().equals(month) && Boolean.TRUE.equals(status)) {

                // Generate every two months inspections
                List<ActivityGroup> groupList = activityGroupRepository
                        .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

                if (!groupList.isEmpty()) {
                    for (ActivityGroup activityGroup : groupList) {
                        for (Activity activity : activityGroup.getActivities()) {
                            Inspection inspection = new Inspection();

                            LocalDateTime startTime;
                            if (now.getMonth().getValue() < 10) {
                                startTime = LocalDateTime.parse(now.getYear() + "-0" + now.getMonth().getValue() + "-01"
                                        + MINUTE_AFTER_MIDNIGHT);
                            } else {
                                startTime = LocalDateTime.parse(now.getYear() + "-" + now.getMonth().getValue() + "-01"
                                        + MINUTE_AFTER_MIDNIGHT);
                            }
                            LocalDateTime endTime = startTime.plusMonths(1).minusMinutes(2);

                            inspection.setStatus(NEW_INSPECTION);
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

        // Check if the device is working
        Boolean status = connectionService.get(connectionId).getDevice().getStatus();
        if (LocalDateTime.now().isAfter(next) && Boolean.TRUE.equals(status)) {

            // Generate yearly inspection
            List<ActivityGroup> groupList = activityGroupRepository
                    .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

            if (!groupList.isEmpty()) {
                for (ActivityGroup activityGroup : groupList) {
                    for (Activity activity : activityGroup.getActivities()) {
                        LocalDateTime start = LocalDateTime
                                .parse(LocalDateTime.now().toLocalDate().toString() + MINUTE_AFTER_MIDNIGHT);
                        Inspection inspection = new Inspection();
                        inspection.setStatus(NEW_INSPECTION);
                        inspection.setStartTime(start.toString());
                        inspection.setEndTime(start.plusMonths(3).minusMinutes(2).toString());
                        inspection.setActivity(activity);
                        inspectionService.save(inspection);
                    }
                }

            }
        }
    }

    // Inspection on demand
    public void onDemand(Long connectionId, Principal principal) {

        // Change status of overdue on demand inspections
        setOverdue(connectionId);

        // Check if the device is working
        Boolean status = connectionService.get(connectionId).getDevice().getStatus();
        if (Boolean.TRUE.equals(status)) {

            // Generate on demand inspection
            List<ActivityGroup> groupList = activityGroupRepository
                    .findByConnectionConnectionIdAndConnectionStatus(connectionId, true);

            if (!groupList.isEmpty()) {
                for (ActivityGroup activityGroup : groupList) {
                    for (Activity activity : activityGroup.getActivities()) {
                        LocalDateTime start = LocalDateTime
                                .parse(LocalDateTime.now().toLocalDate().toString() + MINUTE_AFTER_MIDNIGHT);
                        Inspection inspection = new Inspection();
                        if (activity.getName().equals("Pracownik, który zlecił wygenerowanie przeglądu.")) {
                            inspection.setStatus(INSPECTION_COMPLETED);
                            inspection.setParameter("true");
                            inspection.setComment(INSPECTION_GENERATED);
                            inspection.setDatetime(LocalDateTime.now().toLocalDate().toString() + "T"
                                    + LocalDateTime.now().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")));
                            inspection.setPerson(personService.getByUsername(principal.getName()));
                        } else {
                            inspection.setStatus(NEW_INSPECTION);
                        }

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