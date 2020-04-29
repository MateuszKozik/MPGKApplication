package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.repositories.ConnectionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConnectionService {

    @Autowired private ConnectionRepository connectionRepository;
    
    public List<Connection> listAll(){
        return connectionRepository.findAll();
    }

    public void save(Connection connection){
        connectionRepository.save(connection);
    }

    public Connection get(Long id){
        return connectionRepository.findById(id).get();
    }

    public void delete(Long id){
        connectionRepository.deleteById(id);
    }

    public Boolean isConnectionExist(Long id){
        return connectionRepository.existsById(id);
    }

    public Connection update(Long id, Connection connection){
        Connection currentConnection = get(id);
        currentConnection.setName(connection.getName());
        save(currentConnection);
        return currentConnection;
    }
}