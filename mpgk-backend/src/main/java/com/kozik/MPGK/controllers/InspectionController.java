package com.kozik.MPGK.controllers;

import com.kozik.MPGK.entities.Inspection;
import com.kozik.MPGK.services.InspectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import springfox.documentation.annotations.ApiIgnore;

import com.kozik.MPGK.services.MapValidationErrorService;
import org.springframework.validation.BindingResult;

import java.security.Principal;

import javax.validation.Valid;

import com.kozik.MPGK.utilities.Message;

@RestController
@CrossOrigin
@Api(tags = "inspections", description = "Operations about inspection")
@RequestMapping("/api/inspections")
public class InspectionController {

    @Autowired
    private InspectionService inspectionService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all inspections
    @ApiOperation(value = "Get all inspections")
    @GetMapping("")
    public Iterable<Inspection> getInspections() {
        return inspectionService.listAll();
    }

    // Get single inspection
    @ApiOperation(value = "Get inspection by id")
    @GetMapping("/{inspectionId}")
    public ResponseEntity<?> getInspection(
            @ApiParam(value = "Unique id of inspection", example = "123") @PathVariable Long inspectionId) {
        return new ResponseEntity<>(inspectionService.get(inspectionId), HttpStatus.OK);
    }

    // Create inspection
    @ApiOperation(value = "Create new inspection")
    @PostMapping("")
    public ResponseEntity<?> createInspection(
            @ApiParam(value = "Created inspection object") @Valid @RequestBody Inspection inspection,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(inspectionService.save(inspection), HttpStatus.CREATED);
    }

    // Update inspection
    @ApiOperation(value = "Update inspection")
    @PutMapping("/{inspectionId}")
    public ResponseEntity<?> updateInspection(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long inspectionId,
            @ApiParam(value = "Updated inspection object") @Valid @RequestBody Inspection inspection,
            BindingResult result, @ApiIgnore Principal principal) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(inspectionService.update(inspectionId, inspection, principal), HttpStatus.OK);
    }

    // Update overdue inspection
    @ApiOperation(value = "Update overdue inspection with role 'KIEROWNIK'")
    @PreAuthorize("hasRole('KIEROWNIK')")
    @PutMapping("/overdue/{inspectionId}")
    public ResponseEntity<?> updateOverdueInspection(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long inspectionId,
            @ApiParam(value = "Updated inspection object") @Valid @RequestBody Inspection inspection,
            BindingResult result, @ApiIgnore Principal principal) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(inspectionService.updateOverdue(inspectionId, inspection, principal),
                HttpStatus.OK);
    }

    // Delete inspection
    @ApiOperation(value = "Delete inspection")
    @DeleteMapping("/{inspectionId}")
    public ResponseEntity<?> deleteInspection(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long inspectionId) {
        inspectionService.delete(inspectionId);
        return new ResponseEntity<>(new Message("Inspection with id: " + inspectionId + " has been removed."),
                HttpStatus.OK);
    }

    // Delete all inspections
    @ApiOperation(value = "Delete all inspections")
    @DeleteMapping("")
    public ResponseEntity<?> deleteAllInspections() {
        inspectionService.deleteAll();
        return new ResponseEntity<>(new Message("All inspection have been deleted."), HttpStatus.OK);
    }

    // Get inspections which contains nitrogen cylinder replacement
    @ApiOperation(value = "Get inspections which contains nitrogen cylinder replacement")
    @GetMapping("/nitrogen")
    public ResponseEntity<?> getActionsByName() {
        return new ResponseEntity<>(
                inspectionService.getActionsByName("Czy na bieżącej zmianie wymieniona została butla z azotem?", "TAK"),
                HttpStatus.OK);
    }

    // Get inspection list with status by connection id
    @ApiOperation(value = "Get inspection list with status by connection id")
    @GetMapping("/list/{connectionId}")
    public ResponseEntity<?> getInspectionsListByConnection(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId) {
        return new ResponseEntity<>(inspectionService.getInspectionsListByConnection(connectionId), HttpStatus.OK);
    }

    // Get inspections to execute by connection id
    @ApiOperation(value = "Get inspections to execute by connection id")
    @GetMapping("/list/{connectionId}/execute")
    public ResponseEntity<?> getInspectionByConnection(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId) {
        return new ResponseEntity<>(inspectionService.getInspectionByConnection(connectionId), HttpStatus.OK);
    }

    // Get overdue inspections to execute by connection id
    @ApiOperation(value = "Get overdue inspections to execute by connection id")
    @GetMapping("/list/{connectionId}/overdue/{endTime}")
    public ResponseEntity<?> getOverdueInspectionByConnection(@PathVariable Long connectionId,
            @PathVariable String endTime) {
        return new ResponseEntity<>(inspectionService.getOverdueInspectionByConnection(connectionId, endTime),
                HttpStatus.OK);
    }

    // Get inspection list by id (deviceId, connectionId, personId) and start time
    // range
    @ApiOperation(value = "Get inspection list by id (deviceId, connectionId, personId) and start time range")
    @GetMapping("/list/{id}/from/{startTime}/to/{endTime}")
    public ResponseEntity<?> getConnectionAndStartTimeBetween(
            @ApiParam(value = "Unique id of connection, device or person", example = "123") @PathVariable Long id,
            @ApiParam(value = "Starting date", example = "2020-11-01T00:01") @PathVariable String startTime,
            @ApiParam(value = "End date", example = "2020-12-31T23:59") @PathVariable String endTime,
            @ApiParam(value = "Type of id", allowableValues = "przeglad,urzadzenie,pracownik") @RequestParam String type) {
        return new ResponseEntity<>(inspectionService.getConnectionAndStartTimeBetween(id, startTime, endTime, type),
                HttpStatus.OK);
    }

    // Get inspections by connection id and time range
    @ApiOperation(value = "Get inspections by connection id and time range")
    @GetMapping("/list/{connectionId}/{startTime}/to/{endTime}/show")
    public ResponseEntity<?> getInspectionByConnectionAndStartTimeAndEndTime(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId,
            @ApiParam(value = "Starting date", example = "2020-11-01T00:01") @PathVariable String startTime,
            @ApiParam(value = "End date", example = "2020-12-31T23:59") @PathVariable String endTime) {
        return new ResponseEntity<>(
                inspectionService.getInspectionByConnectionAndStartTimeAndEndTime(connectionId, startTime, endTime),
                HttpStatus.OK);
    }

    // Delete inspections by connection id and time range
    @ApiOperation(value = "Delete inspections by connection id and time range")
    @DeleteMapping("/list/{connectionId}/{startTime}/to/{endTime}/delete")
    public ResponseEntity<?> deleteInspectionByConnectionAndStartTimeAndEndTime(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId,
            @ApiParam(value = "Starting date", example = "2020-11-01T00:01") @PathVariable String startTime,
            @ApiParam(value = "End date", example = "2020-12-31T23:59") @PathVariable String endTime) {
        inspectionService.deleteInspectionByConnectionAndStartTimeAndEndTime(connectionId, startTime, endTime);
        return new ResponseEntity<>(new Message("Inspection have been deleted."), HttpStatus.OK);
    }
}