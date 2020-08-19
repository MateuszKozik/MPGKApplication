package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.exceptions.connectionExceptions.ConnectionAlreadyExistException;
import com.kozik.MPGK.exceptions.connectionExceptions.ConnectionNotFoundException;
import com.kozik.MPGK.repositories.ConnectionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConnectionService {

    @Autowired
    private ConnectionRepository connectionRepository;

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
            element.setOverviewType(connection.getOverviewType());
            element.setDevice(connection.getDevice());
            return connectionRepository.save(element);
        }).orElseThrow(() -> new ConnectionNotFoundException(connectionId));
        return newConnection;
    }
}