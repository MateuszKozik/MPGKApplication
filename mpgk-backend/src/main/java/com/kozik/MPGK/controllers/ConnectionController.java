package com.kozik.MPGK.controllers;

import javax.validation.Valid;

import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.services.ConnectionService;
import com.kozik.MPGK.services.MapValidationErrorService;
import com.kozik.MPGK.utilities.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/connections")
public class ConnectionController {

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all connections
    @GetMapping("")
    public Iterable<Connection> getConnections() {
        return connectionService.listAll();
    }

    // Get single connection
    @GetMapping("/{connectionId}")
    public ResponseEntity<?> getConnection(@PathVariable Long connectionId) {
        return new ResponseEntity<Connection>(connectionService.get(connectionId), HttpStatus.OK);
    }

    // Create connection
    @PostMapping("")
    public ResponseEntity<?> createConnection(@Valid @RequestBody Connection connection, BindingResult result) {
        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<Connection>(connectionService.save(connection), HttpStatus.CREATED);
    }

    // Update connection
    @PutMapping("/{connectionId}")
    public ResponseEntity<?> updateConnection(@PathVariable Long connectionId,
            @Valid @RequestBody Connection connection, BindingResult result) {
        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<Connection>(connectionService.update(connectionId, connection), HttpStatus.OK);
    }

    // Delete connection
    @DeleteMapping("/{connectionId}")
    public ResponseEntity<?> deleteConnection(@PathVariable Long connectionId) {
        connectionService.delete(connectionId);
        return new ResponseEntity<Message>(new Message("Connection with id: " + connectionId + " has been removed."),
                HttpStatus.OK);
    }
}