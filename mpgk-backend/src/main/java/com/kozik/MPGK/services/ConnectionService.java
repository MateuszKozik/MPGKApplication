package com.kozik.MPGK.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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
        return connectionRepository.save(connection);
    }

    public Connection get(Long connectionId) {
        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow(() -> new ConnectionNotFoundException(connectionId));
        return connection;
    }

    public void delete(Long connectionId) {
        connectionRepository.delete(get(connectionId));
    }

    public Boolean isConnectionExist(Long id) {
        return connectionRepository.existsById(id);
    }

    public Connection update(Long connectionId, Connection connection) {
        Connection newConnection = connectionRepository.findById(connectionId).map(element -> {
            element.setName(connection.getName());
            element.setStatus(connection.getStatus());
            element.setInspectionType(connection.getInspectionType());
            element.setDevice(connection.getDevice());
            return connectionRepository.save(element);
        }).orElseThrow(() -> new ConnectionNotFoundException(connectionId));
        return newConnection;
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