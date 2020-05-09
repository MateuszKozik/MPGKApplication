package com.kozik.MPGK.controllers;

import javax.validation.Valid;

import com.kozik.MPGK.entities.OverviewType;
import com.kozik.MPGK.services.MapValidationErrorService;
import com.kozik.MPGK.services.OverviewTypeService;
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
@RequestMapping("/api/overview-types")
public class OverviewTypeController {

    @Autowired
    private OverviewTypeService overviewTypeService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all overview types
    @GetMapping("")
    public Iterable<OverviewType> getOverviewTypes() {
        return overviewTypeService.listAll();
    }

    // Get single overview type
    @GetMapping("/{typeId}")
    public ResponseEntity<?> getOverviewType(@PathVariable Long typeId) {
        return new ResponseEntity<>(overviewTypeService.get(typeId), HttpStatus.OK);
    }

    // Create overview type
    @PostMapping("")
    public ResponseEntity<?> createOverviewType(@Valid @RequestBody OverviewType overviewType, BindingResult result) {
        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<OverviewType>(overviewTypeService.save(overviewType), HttpStatus.CREATED);
    }

    // Update overview type
    @PutMapping("/{typeId}")
    public ResponseEntity<?> updateOvrviewType(@PathVariable Long typeId, @Valid @RequestBody OverviewType overviewType,
            BindingResult result) {
        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<OverviewType>(overviewTypeService.update(typeId, overviewType), HttpStatus.OK);
    }

    // Delete overview type
    @DeleteMapping("/{typeId}")
    public ResponseEntity<?> deleteOverviewType(@PathVariable Long typeId) {
        overviewTypeService.delete(typeId);
        return new ResponseEntity<Message>(new Message("Overview type with id: " + typeId + " has been removed."),
                HttpStatus.OK);
    }
}