package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.services.ConnectionService;
import com.kozik.MPGK.utilities.ErrorMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class ConnectionController {

    @Autowired private ConnectionService connectionService;

    //Get all connections
    @GetMapping("/connections")
    public ResponseEntity<List<Connection>> getConnections(){
        List<Connection> connections = connectionService.listAll();
        if(connections.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Connection>>(connections, HttpStatus.OK);
    }

    //Get single connection
    @GetMapping("/connections/{connectionId}")
    public ResponseEntity<?> getConnection(@PathVariable("connectionId")Long connectionId){
        if(!connectionService.isConnectionExist(connectionId)){
            return new ResponseEntity<>(new ErrorMessage("Connection with id " + connectionId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Connection connection = connectionService.get(connectionId);
        return new ResponseEntity<Connection>(connection, HttpStatus.OK);
    }

    //Create connection
    @PostMapping("/connections")
    public ResponseEntity<?> createConnection(@RequestBody Connection connection, UriComponentsBuilder builder){
        Long connectionId = connection.getConnectionId();
        if(connectionId != null){
            return new ResponseEntity<>(new ErrorMessage("Unable to create. Connection with id " + connectionId 
            + " already exist."), HttpStatus.CONFLICT);
        }
        connectionService.save(connection);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/connections/{connectionId}").buildAndExpand(connection.getConnectionId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Update connection
    @PutMapping("/connections/{connectionId}")
    public ResponseEntity<?> updateConnection(@PathVariable("connectionId")Long connectionId, @RequestBody Connection connection){
        if(!connectionService.isConnectionExist(connectionId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to update. Connection with id " + connectionId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Connection currentConnection = connectionService.update(connectionId, connection);
        return new ResponseEntity<Connection>(currentConnection, HttpStatus.OK);
    }

    //Delete connection
    @DeleteMapping("/connections/{connectionId}")
    public ResponseEntity<?> deleteConnection(@PathVariable("connectionId")Long connectionId){
        if(!connectionService.isConnectionExist(connectionId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. Connection with id " + connectionId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        connectionService.delete(connectionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}