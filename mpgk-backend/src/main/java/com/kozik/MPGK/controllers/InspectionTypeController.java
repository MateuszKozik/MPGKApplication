package com.kozik.MPGK.controllers;

import javax.validation.Valid;

import com.kozik.MPGK.entities.InspectionType;
import com.kozik.MPGK.services.MapValidationErrorService;
import com.kozik.MPGK.services.InspectionTypeService;
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

@RestController
@CrossOrigin
@RequestMapping("/api/inspection-types")
public class InspectionTypeController {

    @Autowired
    private InspectionTypeService inspectionTypeService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all inspection types
    @GetMapping("")
    public Iterable<InspectionType> getInspectionTypes() {
        return inspectionTypeService.listAll();
    }

    // Get single inspection type
    @GetMapping("/{typeId}")
    public ResponseEntity<?> getInspectionType(@PathVariable Long typeId) {
        return new ResponseEntity<>(inspectionTypeService.get(typeId), HttpStatus.OK);
    }

    // Create inspection type
    @PostMapping("")
    public ResponseEntity<?> createInspectionType(@Valid @RequestBody InspectionType inspectionType,
            BindingResult result) {
        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<InspectionType>(inspectionTypeService.save(inspectionType), HttpStatus.CREATED);
    }

    // Update inspection type
    @PutMapping("/{typeId}")
    public ResponseEntity<?> updateInspectionType(@PathVariable Long typeId,
            @Valid @RequestBody InspectionType inspectionType, BindingResult result) {
        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<InspectionType>(inspectionTypeService.update(typeId, inspectionType), HttpStatus.OK);
    }

    // Delete inspection type
    @DeleteMapping("/{typeId}")
    public ResponseEntity<?> deleteInspectionType(@PathVariable Long typeId) {
        inspectionTypeService.delete(typeId);
        return new ResponseEntity<Message>(new Message("Inspection type with id: " + typeId + " has been removed."),
                HttpStatus.OK);
    }
}