package com.kozik.MPGK.services;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.entities.Inspection;
import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.exceptions.inspectionExceptions.InspectionAlreadyExistException;
import com.kozik.MPGK.exceptions.inspectionExceptions.InspectionNotFoundException;
import com.kozik.MPGK.repositories.ActivityGroupRepository;
import com.kozik.MPGK.repositories.InspectionRepository;
import com.kozik.MPGK.utilities.ConnectionObject;
import com.kozik.MPGK.utilities.InspectionObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InspectionService {
    @Autowired
    private InspectionRepository inspectionRepository;

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private PersonService personService;

    @Autowired
    private ActivityGroupRepository activityGroupRepository;

    public Iterable<Inspection> listAll() {
        return inspectionRepository.findAll();
    }

    public Inspection save(Inspection inspection) {
        if (inspection.getInspectionId() != null) {
            throw new InspectionAlreadyExistException(inspection.getInspectionId());
        }
        return inspectionRepository.save(inspection);
    }

    public Inspection get(Long inspectionId) {
        return inspectionRepository.findById(inspectionId)
                .orElseThrow(() -> new InspectionNotFoundException(inspectionId));
    }

    public void delete(Long inspectionId) {
        inspectionRepository.delete(get(inspectionId));
    }

    public Boolean isInspectionExist(Long id) {
        return inspectionRepository.existsById(id);
    }

    public Inspection update(Long inspectionId, Inspection inspection, Principal principal) {
        String username = principal.getName();
        return inspectionRepository.findById(inspectionId).map(element -> {
            if (LocalDateTime.now().isBefore(LocalDateTime.parse(element.getEndTime()))) {
                element.setStatus(inspection.getStatus());
                element.setStartTime(inspection.getStartTime());
                element.setEndTime(inspection.getEndTime());
                element.setParameter(inspection.getParameter());
                element.setComment(inspection.getComment());
                element.setDatetime(LocalDateTime.now().toLocalDate().toString() + "T"
                        + LocalDateTime.now().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")));
                element.setActivity(inspection.getActivity());
                element.setPerson(personService.getByUsername(username));
                return inspectionRepository.save(element);
            } else {
                return inspection;
            }
        }).orElseThrow(() -> new InspectionNotFoundException(inspectionId));

    }

    public Inspection updateWithoutPerson(Long inspectionId, Inspection inspection) {
        return inspectionRepository.findById(inspectionId).map(element -> {
            element.setStatus(inspection.getStatus());
            element.setStartTime(inspection.getStartTime());
            element.setEndTime(inspection.getEndTime());
            element.setParameter(inspection.getParameter());
            element.setComment(inspection.getComment());
            element.setDatetime(LocalDateTime.now().toLocalDate().toString() + "T"
                    + LocalDateTime.now().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")));
            element.setActivity(inspection.getActivity());
            element.setPerson(inspection.getPerson());
            return inspectionRepository.save(element);
        }).orElseThrow(() -> new InspectionNotFoundException(inspectionId));
    }

    public Inspection updateOverdue(Long inspectionId, Inspection inspection, Principal principal) {
        String username = principal.getName();
        return inspectionRepository.findById(inspectionId).map(element -> {
            element.setStatus(inspection.getStatus());
            element.setStartTime(inspection.getStartTime());
            element.setEndTime(inspection.getEndTime());
            element.setParameter(inspection.getParameter());
            element.setComment(inspection.getComment());
            element.setActivity(inspection.getActivity());
            element.setPerson(personService.getByUsername(username));
            return inspectionRepository.save(element);
        }).orElseThrow(() -> new InspectionNotFoundException(inspectionId));
    }

    // Set overdue inspection by the task service
    public Inspection generateOverdue(Long inspectionId, Inspection inspection) {
        return inspectionRepository.findById(inspectionId).map(element -> {
            element.setStatus(inspection.getStatus());
            element.setStartTime(inspection.getStartTime());
            element.setEndTime(inspection.getEndTime());
            element.setParameter(inspection.getParameter());
            element.setComment(inspection.getComment());
            element.setActivity(inspection.getActivity());
            element.setPerson(inspection.getPerson());
            return inspectionRepository.save(element);
        }).orElseThrow(() -> new InspectionNotFoundException(inspectionId));
    }

    public List<InspectionObject> getInspectionByConnection(Long connectionId) {
        Connection connection = connectionService.get(connectionId);
        List<ActivityGroup> groups = activityGroupRepository.findByConnection(connection);
        ArrayList<InspectionObject> inspectionList = new ArrayList<>();

        LocalDateTime now = LocalDateTime.now();
        Integer countEmsr = 0;
        Integer countSetting = 0;

        // Check if emsr and setting should display
        for (ActivityGroup activityGroup : groups) {
            List<Inspection> inspections = inspectionRepository
                    .findByActivityActivityGroupAndEndTimeGreaterThan(activityGroup, now);

            for (Inspection inspection : inspections) {
                if (!inspection.getActivity().getEmsr().isEmpty()) {
                    countEmsr++;
                }
                if (!inspection.getActivity().getSetting().isEmpty()) {
                    countSetting++;
                }
            }
        }

        for (ActivityGroup activityGroup : groups) {

            List<Inspection> inspections = inspectionRepository
                    .findByActivityActivityGroupAndEndTimeGreaterThan(activityGroup, now);

            InspectionObject inspectionObject = new InspectionObject();

            for (Inspection inspection : inspections) {
                inspectionObject.setStartTime(inspection.getStartTime());
                inspectionObject.setEndTime(inspection.getEndTime());
            }

            if (countEmsr > 0) {
                inspectionObject.setShowEmsr(true);
            }
            if (countSetting > 0) {
                inspectionObject.setShowSetting(true);
            }

            inspectionObject.setActivityGroup(activityGroup);
            inspectionObject.setInspections(inspections);
            inspectionList.add(inspectionObject);
        }

        return inspectionList;
    }

    public List<Inspection> getActionsByName(String name, String parameter) {
        return inspectionRepository.findByActivityNameAndParameter(name, parameter);
    }

    public void deleteAll() {
        inspectionRepository.deleteAll();
    }

    public void setInspectionParameter(String activityName, String parameter, String comment) {
        Inspection inspection = inspectionRepository.findFirstByActivityNameOrderByEndTimeDesc(activityName);
        inspection.setParameter(parameter);
        inspection.setComment(comment);
        inspection.setStatus("Wykonany");
        updateWithoutPerson(inspection.getInspectionId(), inspection);
    }

    public List<ConnectionObject> getInspectionsListByConnection(Long connectionId) {
        ArrayList<ConnectionObject> connectionObjects = new ArrayList<>();

        Connection connection = connectionService.get(connectionId);
        Inspection actualInspection = inspectionRepository
                .findFirstByActivityActivityGroupConnectionAndEndTimeGreaterThan(connection, LocalDateTime.now());
        if (actualInspection != null) {
            ConnectionObject connectionObject = new ConnectionObject();
            Integer count = inspectionRepository.countByActivityActivityGroupConnectionAndStatus(connection, "Nowy");
            if (count == 0) {
                connectionObject.setInspectionStatus("Wykonany");
            } else {
                connectionObject.setInspectionStatus("W trakcie");
            }

            connectionObject.setConnection(connection);
            connectionObject.setEndTime(actualInspection.getEndTime());
            connectionObject.setOverdue(false);
            connectionObjects.add(connectionObject);
        }

        List<Inspection> overdueInspections = inspectionRepository
                .findByActivityActivityGroupConnectionAndStatus(connection, "Zaległy");

        List<String> times = new ArrayList<>();

        for (Inspection inspection : overdueInspections) {
            if (!times.contains(inspection.getEndTime())) {
                times.add(inspection.getEndTime());
            }
        }

        // Sort array of date
        times.sort(Comparator.naturalOrder());
        for (String time : times) {
            ConnectionObject connectionObject = new ConnectionObject();
            connectionObject.setConnection(connection);
            connectionObject.setEndTime(time);
            connectionObject.setOverdue(true);
            connectionObjects.add(connectionObject);
        }

        return connectionObjects;
    }

    public List<InspectionObject> getOverdueInspectionByConnection(Long connectionId, String endTime) {
        Connection connection = connectionService.get(connectionId);
        List<ActivityGroup> groups = activityGroupRepository.findByConnection(connection);

        ArrayList<InspectionObject> inspectionList = new ArrayList<>();

        Integer countEmsr = 0;
        Integer countSetting = 0;

        // Check if emsr and setting should display
        for (ActivityGroup activityGroup : groups) {
            List<Inspection> inspections = inspectionRepository.findByActivityActivityGroupAndEndTime(activityGroup,
                    LocalDateTime.parse(endTime));

            for (Inspection inspection : inspections) {
                if (!inspection.getActivity().getEmsr().isEmpty()) {
                    countEmsr++;
                }
                if (!inspection.getActivity().getSetting().isEmpty()) {
                    countSetting++;
                }
            }
        }

        for (ActivityGroup activityGroup : groups) {
            List<Inspection> inspections = inspectionRepository.findByActivityActivityGroupAndEndTime(activityGroup,
                    LocalDateTime.parse(endTime));

            InspectionObject inspectionObject = new InspectionObject();

            for (Inspection inspection : inspections) {
                inspectionObject.setStartTime(inspection.getStartTime());
                inspectionObject.setEndTime(inspection.getEndTime());
            }

            if (countEmsr > 0) {
                inspectionObject.setShowEmsr(true);
            }
            if (countSetting > 0) {
                inspectionObject.setShowSetting(true);
            }

            inspectionObject.setActivityGroup(activityGroup);
            inspectionObject.setInspections(inspections);
            inspectionList.add(inspectionObject);
        }

        return inspectionList;
    }

    public List<ConnectionObject> getConnectionAndStartTimeBetween(Long id, String startTime, String endTime,
            String type) {
        ArrayList<ConnectionObject> connectionObjects = new ArrayList<>();
        if (type.equals("przeglad")) {
            Connection connection = connectionService.get(id);
            List<Inspection> inspectionsAll = inspectionRepository
                    .findByActivityActivityGroupConnectionAndStartTimeBetween(connection,
                            LocalDateTime.parse(startTime), LocalDateTime.parse(endTime));

            List<String> times = new ArrayList<>();

            for (Inspection inspection : inspectionsAll) {
                if (!times.contains(inspection.getStartTime())) {
                    times.add(inspection.getStartTime());

                }

            }

            // Sort array of date
            times.sort(Comparator.naturalOrder());
            for (String time : times) {

                Integer overdue = 0;
                Integer actually = 0;
                List<Inspection> inspections = inspectionRepository.findByActivityActivityGroupConnectionAndStartTime(
                        connection, LocalDateTime.parse(time, DateTimeFormatter.ISO_LOCAL_DATE_TIME));
                ConnectionObject connectionObject = new ConnectionObject();
                for (Inspection inspection : inspections) {

                    if (inspection.getStatus().equals("Zaległy")) {
                        overdue++;
                    }
                    if (inspection.getStatus().equals("Nowy")) {
                        actually++;
                    }
                    connectionObject.setEndTime(inspection.getEndTime());

                }

                connectionObject.setConnection(connection);
                connectionObject.setStartTime(time);

                if (actually == 0 && overdue == 0) {
                    connectionObject.setInspectionStatus("Wykonany");
                } else if (overdue > 0)
                    connectionObject.setInspectionStatus("Zaległy");
                else
                    connectionObject.setInspectionStatus("W trakcie");
                connectionObjects.add(connectionObject);

            }
        } else if (type.equals("urzadzenie")) {
            Device device = deviceService.get(id);
            List<Inspection> inspectionsAll = inspectionRepository
                    .findByActivityActivityGroupConnectionDeviceAndStartTimeBetween(device,
                            LocalDateTime.parse(startTime), LocalDateTime.parse(endTime));

            List<String> times = new ArrayList<>();
            for (Inspection inspection : inspectionsAll) {
                if (!times.contains(inspection.getStartTime())) {
                    times.add(inspection.getStartTime());

                }

            }

            // Sort array of date
            times.sort(Comparator.naturalOrder());
            for (String time : times) {

                Integer overdue = 0;
                Integer actually = 0;
                Connection deviceConnection = null;
                List<Inspection> inspections = inspectionRepository
                        .findByActivityActivityGroupConnectionDeviceAndStartTime(device,
                                LocalDateTime.parse(time, DateTimeFormatter.ISO_LOCAL_DATE_TIME));
                ConnectionObject connectionObject = new ConnectionObject();
                for (Inspection inspection : inspections) {
                    deviceConnection = inspection.getActivity().getActivityGroup().getConnection();
                    if (inspection.getStatus().equals("Zaległy")) {
                        overdue++;
                    }
                    if (inspection.getStatus().equals("Nowy")) {
                        actually++;
                    }
                    connectionObject.setEndTime(inspection.getEndTime());

                }

                connectionObject.setConnection(deviceConnection);
                connectionObject.setStartTime(time);

                if (actually == 0 && overdue == 0) {
                    connectionObject.setInspectionStatus("Wykonany");
                } else if (overdue > 0)
                    connectionObject.setInspectionStatus("Zaległy");
                else
                    connectionObject.setInspectionStatus("W trakcie");
                connectionObjects.add(connectionObject);

            }
        } else if (type.equals("pracownik")) {
            Person person = personService.get(id);
            List<Inspection> inspectionsAll = inspectionRepository.findByPersonAndStartTimeBetween(person,
                    LocalDateTime.parse(startTime), LocalDateTime.parse(endTime));

            List<String> times = new ArrayList<>();

            for (Inspection inspection : inspectionsAll) {
                if (!times.contains(inspection.getStartTime())) {
                    times.add(inspection.getStartTime());

                }
            }

            // Sort array of date
            times.sort(Comparator.naturalOrder());
            for (String time : times) {

                Integer overdue = 0;
                Integer actually = 0;
                Connection personConnection = null;
                List<Inspection> inspections = inspectionRepository.findByPersonAndStartTime(person,
                        LocalDateTime.parse(time, DateTimeFormatter.ISO_LOCAL_DATE_TIME));
                ConnectionObject connectionObject = new ConnectionObject();
                for (Inspection inspection : inspections) {
                    personConnection = inspection.getActivity().getActivityGroup().getConnection();
                    if (inspection.getStatus().equals("Zaległy")) {
                        overdue++;
                    }
                    if (inspection.getStatus().equals("Nowy")) {
                        actually++;
                    }
                    connectionObject.setEndTime(inspection.getEndTime());

                }

                connectionObject.setConnection(personConnection);
                connectionObject.setStartTime(time);

                if (actually == 0 && overdue == 0) {
                    connectionObject.setInspectionStatus("Wykonany");
                } else if (overdue > 0)
                    connectionObject.setInspectionStatus("Zaległy");
                else
                    connectionObject.setInspectionStatus("W trakcie");
                connectionObjects.add(connectionObject);

            }

        }

        return connectionObjects;
    }

    public List<InspectionObject> getInspectionByConnectionAndStartTimeAndEndTime(Long connectionId, String startTime,
            String endTime) {
        Connection connection = connectionService.get(connectionId);
        List<ActivityGroup> groups = activityGroupRepository.findByConnection(connection);

        ArrayList<InspectionObject> inspectionList = new ArrayList<>();

        Integer countEmsr = 0;
        Integer countSetting = 0;

        // Check if emsr and setting should display
        for (ActivityGroup activityGroup : groups) {
            List<Inspection> inspections = inspectionRepository.findByActivityActivityGroupAndStartTimeAndEndTime(
                    activityGroup, LocalDateTime.parse(startTime), LocalDateTime.parse(endTime));

            for (Inspection inspection : inspections) {
                if (!inspection.getActivity().getEmsr().isEmpty() || !inspection.getActivity().getSetting().isEmpty()) {
                    countEmsr++;
                }
                if (!inspection.getActivity().getSetting().isEmpty()) {
                    countSetting++;
                }
            }
        }

        for (ActivityGroup activityGroup : groups) {
            List<Inspection> inspections = inspectionRepository.findByActivityActivityGroupAndStartTimeAndEndTime(
                    activityGroup, LocalDateTime.parse(startTime), LocalDateTime.parse(endTime));

            InspectionObject inspectionObject = new InspectionObject();

            for (Inspection inspection : inspections) {
                inspectionObject.setStartTime(inspection.getStartTime());
                inspectionObject.setEndTime(inspection.getEndTime());
            }

            if (countEmsr > 0) {
                inspectionObject.setShowEmsr(true);
            }
            if (countSetting > 0) {
                inspectionObject.setShowSetting(true);
            }

            inspectionObject.setActivityGroup(activityGroup);
            inspectionObject.setInspections(inspections);
            inspectionList.add(inspectionObject);
        }

        return inspectionList;
    }

    public void deleteInspectionByConnectionAndStartTimeAndEndTime(Long connectionId, String startTime,
            String endTime) {
        Connection connection = connectionService.get(connectionId);
        List<ActivityGroup> groups = activityGroupRepository.findByConnection(connection);

        for (ActivityGroup activityGroup : groups) {

            for (Inspection inspection : inspectionRepository.findByActivityActivityGroupAndStartTimeAndEndTime(
                    activityGroup, LocalDateTime.parse(startTime), LocalDateTime.parse(endTime))) {

                delete(inspection.getInspectionId());

            }

        }

    }
}