package com.kozik.MPGK.controllers;

import javax.validation.Valid;

import com.kozik.MPGK.entities.FluidRegistry;
import com.kozik.MPGK.services.FluidRegistryService;
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

@RestController
@CrossOrigin
@RequestMapping("/api/fluid-registries")
public class FluidRegistryController {

    @Autowired
    private FluidRegistryService fluidRegistryService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all fluid registries
    @GetMapping("")
    public Iterable<FluidRegistry> getFluidRegistries() {
        return fluidRegistryService.listAll();
    }

    // Get single fluid registry
    @GetMapping("/{registryId}")
    public ResponseEntity<?> getFluidRegistry(@PathVariable Long registryId) {
        return new ResponseEntity<FluidRegistry>(fluidRegistryService.get(registryId), HttpStatus.OK);
    }

    // Create fluid registry
    @PostMapping("")
    public ResponseEntity<?> createFluidRegistry(@Valid @RequestBody FluidRegistry fluidRegistry,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<FluidRegistry>(fluidRegistryService.save(fluidRegistry), HttpStatus.CREATED);
    }

    // Update fluid registry
    @PutMapping("/{registryId}")
    public ResponseEntity<?> updateFluidRegistry(@PathVariable Long registryId,
            @Valid @RequestBody FluidRegistry fluidRegistry, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<FluidRegistry>(fluidRegistryService.update(registryId, fluidRegistry), HttpStatus.OK);
    }

    // Delete fluid registry
    @DeleteMapping("/{registryId}")
    public ResponseEntity<?> deleteFluidRegistry(@PathVariable Long registryId) {
        fluidRegistryService.delete(registryId);
        return new ResponseEntity<Message>(new Message("Fluid registry with id: " + registryId + " has been removed."),
                HttpStatus.OK);
    }
}