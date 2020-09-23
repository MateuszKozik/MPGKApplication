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
@Api(tags = "fluids", description = "Operations about fluid")
@RequestMapping("/api/fluids")
public class FluidController {

    @Autowired
    private FluidService fluidService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all fluids
    @ApiOperation(value = "Get all fluids")
    @GetMapping("")
    public Iterable<Fluid> getFluids() {
        return fluidService.listAll();
    }

    // Get single fluid
    @ApiOperation(value = "Get fluid by id")
    @GetMapping("/{fluidId}")
    public ResponseEntity<?> getFluid(
            @ApiParam(value = "Unique id of fluid", example = "123") @PathVariable Long fluidId) {
        return new ResponseEntity<>(fluidService.get(fluidId), HttpStatus.OK);
    }

    // Create fluid
    @ApiOperation(value = "Create new fluid")
    @PostMapping("")
    public ResponseEntity<?> createFluid(@ApiParam(value = "Created fluid object") @Valid @RequestBody Fluid fluid,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(fluidService.save(fluid), HttpStatus.CREATED);
    }

    // Update fluid
    @ApiOperation(value = "Update fluid")
    @PutMapping("/{fluidId}")
    public ResponseEntity<?> updateFluid(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long fluidId,
            @ApiParam(value = "Updated fluid object") @Valid @RequestBody Fluid fluid, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(fluidService.update(fluidId, fluid), HttpStatus.OK);
    }

    // Delete fluid
    @ApiOperation(value = "Delete fluid")
    @DeleteMapping("/{fluidId}")
    public ResponseEntity<?> deleteFluid(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long fluidId) {
        fluidService.delete(fluidId);
        return new ResponseEntity<>(new Message("Fluid with id: " + fluidId + " has been removed."), HttpStatus.OK);
    }
}