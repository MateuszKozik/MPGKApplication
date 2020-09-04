package com.kozik.MPGK.controllers;

import com.kozik.MPGK.entities.Inspection;
import com.kozik.MPGK.services.InspectionService;
import org.springframework.beans.factory.annotation.Autowired;
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

import com.kozik.MPGK.services.MapValidationErrorService;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.kozik.MPGK.utilities.ConnectionObject;
import com.kozik.MPGK.utilities.Message;
import com.kozik.MPGK.utilities.InspectionObject;

@RestController
@RequestMapping("/api/inspections")
public class InspectionController {

    @Autowired
    private InspectionService inspectionService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all inspections
    @GetMapping("")
    public Iterable<Inspection> getInspections() {
        return inspectionService.listAll();
    }

    // Get single inspection
    @GetMapping("/{inspectionId}")
    public ResponseEntity<?> getInspection(@PathVariable Long inspectionId) {
        return new ResponseEntity<Inspection>(inspectionService.get(inspectionId), HttpStatus.OK);
    }

    // Create inspection
    @PostMapping("")
    public ResponseEntity<?> createInspection(@Valid @RequestBody Inspection inspection, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Inspection>(inspectionService.save(inspection), HttpStatus.CREATED);
    }

    // Update inspection
    @PutMapping("/{inspectionId}")
    public ResponseEntity<?> updateInspection(@PathVariable Long inspectionId,
            @Valid @RequestBody Inspection inspection, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Inspection>(inspectionService.update(inspectionId, inspection), HttpStatus.OK);
    }

    // Delete inspection
    @DeleteMapping("/{inspectionId}")
    public ResponseEntity<?> deleteInspection(@PathVariable Long inspectionId) {
        inspectionService.delete(inspectionId);
        return new ResponseEntity<Message>(new Message("Inspection with id: " + inspectionId + " has been removed."),
                HttpStatus.OK);
    }

    // Delete all inspections
    @DeleteMapping("")
    public ResponseEntity<?> deleteAllInspections() {
        inspectionService.deleteAll();
        return new ResponseEntity<Message>(new Message("All inspection have been deleted."), HttpStatus.OK);
    }

    @GetMapping("/nitrogen")
    public ResponseEntity<?> getActionsByName() {
        List<Inspection> inspections = inspectionService
                .getActionsByName("Czy na bieżącej zmianie wymieniona została butla z azotem?", "TAK");
        return new ResponseEntity<List<Inspection>>(inspections, HttpStatus.OK);
    }

    // Get all inspections by connection
    @GetMapping("/list/{connectionId}")
    public ResponseEntity<?> getInspectionsListByConnection(@PathVariable Long connectionId) {
        return new ResponseEntity<ArrayList<ConnectionObject>>(
                inspectionService.getInspectionsListByConnection(connectionId), HttpStatus.OK);
    }

    // Get inspections by connection
    @GetMapping("/list/{connectionId}/execute")
    public ResponseEntity<?> getInspectionByConnection(@PathVariable Long connectionId) {
        return new ResponseEntity<ArrayList<InspectionObject>>(
                inspectionService.getInspectionByConnection(connectionId), HttpStatus.OK);
    }

    @GetMapping("/list/{connectionId}/overdue/{endTime}")
    public ResponseEntity<?> getOverdueInspectionByConnection(@PathVariable Long connectionId,
            @PathVariable String endTime) {
        return new ResponseEntity<ArrayList<InspectionObject>>(
                inspectionService.getOverdueInspectionByConnection(connectionId, endTime), HttpStatus.OK);
    }

    @GetMapping("/list/{connectionId}/from/{startTime}/to/{endTime}")
    public ResponseEntity<?> getConnectionAndStartTimeBetween(@PathVariable Long connectionId,
    @PathVariable String startTime, @PathVariable String endTime) {
        return new ResponseEntity<ArrayList<ConnectionObject>>(
                inspectionService.getConnectionAndStartTimeBetween(connectionId,startTime,endTime), HttpStatus.OK);
    }

    @GetMapping("/list/{connectionId}/connection/{startTime}/to/{endTime}")
    public ResponseEntity<?> getInspectionByConnectionAndStartTimeAndEndTime(@PathVariable Long connectionId,
        @PathVariable String startTime, @PathVariable String endTime) {
        return new ResponseEntity<ArrayList<InspectionObject>>(
                inspectionService.getInspectionByConnectionAndStartTimeAndEndTime(connectionId, startTime, endTime), HttpStatus.OK);
    }
}