package com.kozik.MPGK.controllers;

import javax.validation.Valid;

import com.kozik.MPGK.entities.Fluid;
import com.kozik.MPGK.services.FluidService;
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
@RequestMapping("/api/fluids")
public class FluidController {

    @Autowired
    private FluidService fluidService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all fluids
    @GetMapping("")
    public Iterable<Fluid> getFluids() {
        return fluidService.listAll();
    }

    // Get single fluid
    @GetMapping("/{fluidId}")
    public ResponseEntity<?> getFluid(@PathVariable Long fluidId) {
        return new ResponseEntity<Fluid>(fluidService.get(fluidId), HttpStatus.OK);
    }

    // Create fluid
    @PostMapping("")
    public ResponseEntity<?> createFluid(@Valid @RequestBody Fluid fluid, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Fluid>(fluidService.save(fluid), HttpStatus.CREATED);
    }

    // Update fluid
    @PutMapping("/{fluidId}")
    public ResponseEntity<?> updateFluid(@PathVariable Long fluidId, @Valid @RequestBody Fluid fluid,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Fluid>(fluidService.update(fluidId, fluid), HttpStatus.OK);
    }

    // Delete fluid
    @DeleteMapping("/{fluidId}")
    public ResponseEntity<?> deleteFluid(@PathVariable Long fluidId) {
        fluidService.delete(fluidId);
        return new ResponseEntity<Message>(new Message("Fluid with id: " + fluidId + " has been removed."),
                HttpStatus.OK);
    }
}