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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@CrossOrigin
@Api(tags = "inspection types", description = "Operations about inspection type")
@RequestMapping("/api/inspection-types")
public class InspectionTypeController {

    @Autowired
    private InspectionTypeService inspectionTypeService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all inspection types
    @ApiOperation(value = "Get all inspection types")
    @GetMapping("")
    public Iterable<InspectionType> getInspectionTypes() {
        return inspectionTypeService.listAll();
    }

    // Get single inspection type
    @ApiOperation(value = "Get inspection type by id")
    @GetMapping("/{typeId}")
    public ResponseEntity<?> getInspectionType(
            @ApiParam(value = "Unique id of inspeciton type", example = "123") @PathVariable Long typeId) {
        return new ResponseEntity<>(inspectionTypeService.get(typeId), HttpStatus.OK);
    }

    // Create inspection type
    @ApiOperation(value = "Create new inspection type")
    @PostMapping("")
    public ResponseEntity<?> createInspectionType(
            @ApiParam(value = "Created inspection type object") @Valid @RequestBody InspectionType inspectionType,
            BindingResult result) {
        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<>(inspectionTypeService.save(inspectionType), HttpStatus.CREATED);
    }

    // Update inspection type
    @ApiOperation(value = "Update inspection type")
    @PutMapping("/{typeId}")
    public ResponseEntity<?> updateInspectionType(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long typeId,
            @ApiParam(value = "Updated inspection type object") @Valid @RequestBody InspectionType inspectionType,
            BindingResult result) {
        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<>(inspectionTypeService.update(typeId, inspectionType), HttpStatus.OK);
    }

    // Delete inspection type
    @ApiOperation(value = "Delete inspection type")
    @DeleteMapping("/{typeId}")
    public ResponseEntity<?> deleteInspectionType(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long typeId) {
        inspectionTypeService.delete(typeId);
        return new ResponseEntity<>(new Message("Inspection type with id: " + typeId + " has been removed."),
                HttpStatus.OK);
    }
}