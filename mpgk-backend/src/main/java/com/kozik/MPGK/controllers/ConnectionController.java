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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@CrossOrigin
@Api(tags = "connections", description = "Operations about connection")
@RequestMapping("/api/connections")
public class ConnectionController {

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all connections
    @ApiOperation(value = "Get all connections")
    @GetMapping("")
    public Iterable<Connection> getConnections() {
        return connectionService.listAll();
    }

    // Get single connection
    @ApiOperation(value = "Get connection by id")
    @GetMapping("/{connectionId}")
    public ResponseEntity<?> getConnection(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId) {
        return new ResponseEntity<>(connectionService.get(connectionId), HttpStatus.OK);
    }

    // Create connection
    @ApiOperation(value = "Create new connection")
    @PostMapping("")
    public ResponseEntity<?> createConnection(
            @ApiParam(value = "Created connection object") @Valid @RequestBody Connection connection,
            BindingResult result) {
        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<>(connectionService.save(connection), HttpStatus.CREATED);
    }

    // Update connection
    @ApiOperation(value = "Update connection")
    @PutMapping("/{connectionId}")
    public ResponseEntity<?> updateConnection(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long connectionId,
            @ApiParam(value = "Updated connection object") @Valid @RequestBody Connection connection,
            BindingResult result) {
        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<>(connectionService.update(connectionId, connection), HttpStatus.OK);
    }

    // Delete connection
    @ApiOperation(value = "Delete connection")
    @DeleteMapping("/{connectionId}")
    public ResponseEntity<?> deleteConnection(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long connectionId) {
        connectionService.delete(connectionId);
        return new ResponseEntity<>(new Message("Connection with id: " + connectionId + " has been removed."),
                HttpStatus.OK);
    }
}