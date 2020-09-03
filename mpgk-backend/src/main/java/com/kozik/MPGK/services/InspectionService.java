package com.kozik.MPGK.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Inspection;
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
        Inspection inspection = inspectionRepository.findById(inspectionId)
                .orElseThrow(() -> new InspectionNotFoundException(inspectionId));
        return inspection;
    }

    public void delete(Long inspectionId) {
        inspectionRepository.delete(get(inspectionId));
    }

    public Boolean isInspectionExist(Long id) {
        return inspectionRepository.existsById(id);
    }

    public Inspection update(Long inspectionId, Inspection inspection) {
        Inspection newInspection = inspectionRepository.findById(inspectionId).map(element -> {
            element.setStatus(inspection.getStatus());
            element.setStartTime(inspection.getStartTime());
            element.setEndTime(inspection.getEndTime());
            element.setParameter(inspection.getParameter());
            element.setComment(inspection.getComment());
            element.setDatetime(LocalDateTime.now().toLocalDate().toString() + "T"
                    + LocalDateTime.now().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")));
            element.setActivity(inspection.getActivity());
            element.setPerson(inspection.getPerson());
            element.setSupervisor(inspection.getSupervisor());
            return inspectionRepository.save(element);
        }).orElseThrow(() -> new InspectionNotFoundException(inspectionId));

        return newInspection;
    }

    public Inspection updateOverdue(Long inspectionId, Inspection inspection) {
        Inspection newInspection = inspectionRepository.findById(inspectionId).map(element -> {
            element.setStatus(inspection.getStatus());
            element.setStartTime(inspection.getStartTime());
            element.setEndTime(inspection.getEndTime());
            element.setParameter(inspection.getParameter());
            element.setComment(inspection.getComment());
            element.setActivity(inspection.getActivity());
            element.setPerson(inspection.getPerson());
            element.setSupervisor(inspection.getSupervisor());
            return inspectionRepository.save(element);
        }).orElseThrow(() -> new InspectionNotFoundException(inspectionId));

        return newInspection;
    }

    public ArrayList<InspectionObject> getInspectionByConnection(Long connectionId) {
        Connection connection = connectionService.get(connectionId);
        List<ActivityGroup> groups = activityGroupRepository.findByConnection(connection);

        ArrayList<InspectionObject> inspectionList = new ArrayList<>();

        for (ActivityGroup activityGroup : groups) {
            LocalDateTime now = LocalDateTime.now();
            List<Inspection> inspections = inspectionRepository
                    .findByActivityActivityGroupAndEndTimeGreaterThan(activityGroup, now);

            InspectionObject inspectionObject = new InspectionObject();
            Integer countEmsr = 0;
            Integer countSetting = 0;
            for (Inspection inspection : inspections) {
                if (!inspection.getActivity().getEmsr().isEmpty()) {
                    countEmsr++;
                }
                if (!inspection.getActivity().getSetting().isEmpty()) {
                    countSetting++;
                }
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
        List<Inspection> inspections = inspectionRepository.findByActivityNameAndParameter(name, parameter);

        return inspections;
    }

    public void deleteAll() {
        inspectionRepository.deleteAll();
    }

    public void setInspectionParameter(String activityName, String parameter, String comment) {
        Inspection inspection = inspectionRepository.findFirstByActivityNameOrderByEndTimeDesc(activityName);
        inspection.setParameter(parameter);
        inspection.setComment(comment);
        inspection.setStatus("Wykonany");
        update(inspection.getInspectionId(), inspection);
    }

    public ArrayList<ConnectionObject> getInspectionsListByConnection(Long connectionId) {
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

    public ArrayList<InspectionObject> getOverdueInspectionByConnection(Long connectionId, String endTime) {
        Connection connection = connectionService.get(connectionId);
        List<ActivityGroup> groups = activityGroupRepository.findByConnection(connection);

        ArrayList<InspectionObject> inspectionList = new ArrayList<>();

        for (ActivityGroup activityGroup : groups) {
            List<Inspection> inspections = inspectionRepository.findByActivityActivityGroupAndEndTime(activityGroup,
                    LocalDateTime.parse(endTime));

            InspectionObject inspectionObject = new InspectionObject();
            inspectionObject.setActivityGroup(activityGroup);
            inspectionObject.setInspections(inspections);
            inspectionList.add(inspectionObject);
        }

        return inspectionList;
    }

    public ArrayList<ConnectionObject> getConnectionNameAndStartTimeBetween(Long connectionId, String startTime,String endTime) {
        ArrayList<ConnectionObject> connectionObjects = new ArrayList<>();
        Connection connection = connectionService.get(connectionId);
        List<Inspection> inspectionsAll = inspectionRepository.findByActivityActivityGroupConnectionAndStartTimeBetween(connection, LocalDateTime.parse(startTime), LocalDateTime.parse(endTime));
       
        List<String> times = new ArrayList<>();

        for (Inspection inspection : inspectionsAll) {
            if (!times.contains(inspection.getStartTime())) {
                times.add(inspection.getStartTime());

            }
            
        }

        //Sort array of date
        times.sort(Comparator.naturalOrder());
        for (String time : times) {
            
            Integer overdue = 0;
            List<Inspection> inspections = inspectionRepository.findByActivityActivityGroupConnectionAndStartTime(connection, LocalDateTime.parse(time, DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            ConnectionObject connectionObject = new ConnectionObject();
            for(Inspection inspection : inspections){
                
                if(inspection.getStatus().equals("Zaległy") ){
                    overdue++;
                }
                connectionObject.setEndTime(inspection.getEndTime());
            }
           
            
            connectionObject.setConnection(connection);
            connectionObject.setStartTime(time);
            
            if(overdue > 0)
                connectionObject.setOverdue(true);
            else
                connectionObject.setOverdue(false);
                connectionObjects.add(connectionObject);
            
        }
        return connectionObjects;
    }
}