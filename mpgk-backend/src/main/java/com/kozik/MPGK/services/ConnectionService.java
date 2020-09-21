package com.kozik.MPGK.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Inspection;
import com.kozik.MPGK.exceptions.connectionExceptions.ConnectionAlreadyExistException;
import com.kozik.MPGK.exceptions.connectionExceptions.ConnectionNotFoundException;
import com.kozik.MPGK.repositories.ConnectionRepository;
import com.kozik.MPGK.repositories.InspectionRepository;
import com.kozik.MPGK.utilities.ConnectionObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConnectionService {

    @Autowired
    private ConnectionRepository connectionRepository;

    @Autowired
    private InspectionRepository inspectionRepository;

    public Iterable<Connection> listAll() {
        return connectionRepository.findAll();
    }

    public Connection save(Connection connection) {
        if (connection.getConnectionId() != null) {
            throw new ConnectionAlreadyExistException(connection.getConnectionId());
        }
        if (connection.getInspectionType().getName().equals("Na żądanie")) {
            Activity newActivity = new Activity();
            newActivity.setName("Pracownik, który zlecił wygenerowanie przeglądu.");
            newActivity.setType("Pole tekstowe");
            newActivity.setEmsr("");
            newActivity.setSetting("");
            newActivity.setListItems("");
            List<Activity> activities = new ArrayList<>();
            activities.add(newActivity);

            ActivityGroup newGroup = new ActivityGroup();
            newGroup.setConnection(connection);
            newGroup.setName("Wygenerowany przez");
            newGroup.setActivities(activities);

            List<ActivityGroup> activitiesGroups = connection.getActivitiesGroups();
            activitiesGroups.add(0, newGroup);
            connection.setActivitiesGroups(activitiesGroups);
        } else {
            connection.setActivitiesGroups(connection.getActivitiesGroups());
        }
        List<ActivityGroup> groups = connection.getActivitiesGroups();
        for (ActivityGroup activityGroup : groups) {
            activityGroup.setConnection(connection);
            List<Activity> activities = activityGroup.getActivities();
            for (Activity activity : activities) {
                activity.setActivityGroup(activityGroup);
            }
        }

        return connectionRepository.save(connection);
    }

    public Connection get(Long connectionId) {
        return connectionRepository.findById(connectionId)
                .orElseThrow(() -> new ConnectionNotFoundException(connectionId));
    }

    public void delete(Long connectionId) {
        connectionRepository.delete(get(connectionId));
    }

    public Boolean isConnectionExist(Long id) {
        return connectionRepository.existsById(id);
    }

    public Connection update(Long connectionId, Connection connection) {
        return connectionRepository.findById(connectionId).map(element -> {
            element.setName(connection.getName());
            element.setStatus(connection.getStatus());
            element.setPersons(connection.getPersons());
            return connectionRepository.save(element);
        }).orElseThrow(() -> new ConnectionNotFoundException(connectionId));

    }

    public ArrayList<ConnectionObject> getHomePageConnections() {
        Iterable<Connection> connections = listAll();

        ArrayList<ConnectionObject> connectionObjects = new ArrayList<>();

        for (Connection connection : connections) {
            ConnectionObject object = new ConnectionObject();
            object.setConnection(connection);
            Integer count = inspectionRepository.countByActivityActivityGroupConnectionAndStatus(connection, "Nowy");
            if (count == 0) {
                object.setInspectionStatus("Wykonany");
            } else {
                object.setInspectionStatus("W trakcie");
            }

            List<Inspection> overdueInspections = inspectionRepository
                    .findByActivityActivityGroupConnectionAndStatus(connection, "Zaległy");
            List<String> times = new ArrayList<>();

            for (Inspection inspection : overdueInspections) {
                if (!times.contains(inspection.getEndTime())) {
                    times.add(inspection.getEndTime());
                }
            }
            object.setOverdueCount(times.size());

            Inspection inspection = inspectionRepository
                    .findFirstByActivityActivityGroupConnectionAndEndTimeGreaterThan(connection, LocalDateTime.now());
            if (inspection != null) {
                object.setStartTime(inspection.getStartTime());
                object.setEndTime(inspection.getEndTime());
                LocalDateTime dateTime = LocalDateTime.parse(inspection.getEndTime(),
                        DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                if (dateTime.isAfter(LocalDateTime.now())) {
                    object.setActive(true);
                }
            }
            connectionObjects.add(object);
        }
        return connectionObjects;
    }
}