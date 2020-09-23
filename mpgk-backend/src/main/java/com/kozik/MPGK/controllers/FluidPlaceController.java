package com.kozik.MPGK.controllers;

import javax.validation.Valid;

import com.kozik.MPGK.entities.FluidPlace;
import com.kozik.MPGK.services.FluidPlaceService;
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
@Api(tags = "fluid places", description = "Operations about fluid place")
@RequestMapping("/api/fluid-places")
public class FluidPlaceController {

    @Autowired
    private FluidPlaceService fluidPlaceService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all fluid places
    @ApiOperation(value = "Get all fluid places")
    @GetMapping("")
    public Iterable<FluidPlace> getFluidPlaces() {
        return fluidPlaceService.listAll();
    }

    // Get single fluid place
    @ApiOperation(value = "Get fluid place by id")
    @GetMapping("/{placeId}")
    public ResponseEntity<?> getFluidPlace(
            @ApiParam(value = "Unique id of fluid place", example = "123") @PathVariable Long placeId) {
        return new ResponseEntity<>(fluidPlaceService.get(placeId), HttpStatus.OK);
    }

    // Create fluid place
    @ApiOperation(value = "Create new fluid place")
    @PostMapping("")
    public ResponseEntity<?> createFluidPlace(
            @ApiParam(value = "Created fluid place object") @Valid @RequestBody FluidPlace fluidPlace,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(fluidPlaceService.save(fluidPlace), HttpStatus.CREATED);
    }

    // Update fluid place
    @ApiOperation(value = "Update fluid place")
    @PutMapping("/{placeId}")
    public ResponseEntity<?> updateFluidPlace(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long placeId,
            @ApiParam(value = "Updated fluid place object") @Valid @RequestBody FluidPlace fluidPlace,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(fluidPlaceService.update(placeId, fluidPlace), HttpStatus.OK);
    }

    // Delete fluid place
    @ApiOperation(value = "Delete fluid place")
    @DeleteMapping("{placeId}")
    public ResponseEntity<?> deleteFluidPlace(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long placeId) {
        fluidPlaceService.delete(placeId);
        return new ResponseEntity<>(new Message("Fluid place with id: " + placeId + " has been removed."),
                HttpStatus.OK);
    }
}