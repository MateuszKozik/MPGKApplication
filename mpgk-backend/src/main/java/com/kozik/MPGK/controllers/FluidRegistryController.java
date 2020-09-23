package com.kozik.MPGK.controllers;

import java.security.Principal;

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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@CrossOrigin
@Api(tags = "fluid registries", description = "Operations about fluid registry")
@RequestMapping("/api/fluid-registries")
public class FluidRegistryController {

    @Autowired
    private FluidRegistryService fluidRegistryService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all fluid registries
    @ApiOperation(value = "Get all fluid registries")
    @GetMapping("")
    public Iterable<FluidRegistry> getFluidRegistries() {
        return fluidRegistryService.listAll();
    }

    // Get single fluid registry
    @ApiOperation(value = "Get fluid registry by id")
    @GetMapping("/{registryId}")
    public ResponseEntity<?> getFluidRegistry(
            @ApiParam(value = "Unique id of fluid registry", example = "123") @PathVariable Long registryId) {
        return new ResponseEntity<>(fluidRegistryService.get(registryId), HttpStatus.OK);
    }

    // Create fluid registry
    @ApiOperation(value = "Create new fluid registry")
    @PostMapping("")
    public ResponseEntity<?> createFluidRegistry(
            @ApiParam(value = "Created fluid registry object") @Valid @RequestBody FluidRegistry fluidRegistry,
            BindingResult result, Principal principal) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(fluidRegistryService.save(fluidRegistry, principal), HttpStatus.CREATED);
    }

    // Update fluid registry
    @ApiOperation(value = "Update fluid registry")
    @PutMapping("/{registryId}")
    public ResponseEntity<?> updateFluidRegistry(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long registryId,
            @ApiParam(value = "Updated fluid registry object") @Valid @RequestBody FluidRegistry fluidRegistry,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(fluidRegistryService.update(registryId, fluidRegistry), HttpStatus.OK);
    }

    // Delete fluid registry
    @ApiOperation(value = "Delete fluid registry")
    @DeleteMapping("/{registryId}")
    public ResponseEntity<?> deleteFluidRegistry(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long registryId) {
        fluidRegistryService.delete(registryId);
        return new ResponseEntity<>(new Message("Fluid registry with id: " + registryId + " has been removed."),
                HttpStatus.OK);
    }
}