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

@RestController
@CrossOrigin
@RequestMapping("/api/fluid-places")
public class FluidPlaceController {

    @Autowired
    private FluidPlaceService fluidPlaceService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all fluid places
    @GetMapping("")
    public Iterable<FluidPlace> getFluidPlaces() {
        return fluidPlaceService.listAll();
    }

    // Get single fluid place
    @GetMapping("/{placeId}")
    public ResponseEntity<?> getFluidPlace(@PathVariable Long placeId) {
        return new ResponseEntity<FluidPlace>(fluidPlaceService.get(placeId), HttpStatus.OK);
    }

    // Create fluid place
    @PostMapping("")
    public ResponseEntity<?> createFluidPlace(@Valid @RequestBody FluidPlace fluidPlace, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<FluidPlace>(fluidPlaceService.save(fluidPlace), HttpStatus.CREATED);
    }

    // Update fluid place
    @PutMapping("/{placeId}")
    public ResponseEntity<?> updateFluidPlace(@PathVariable Long placeId, @Valid @RequestBody FluidPlace fluidPlace,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(fluidPlaceService.update(placeId, fluidPlace), HttpStatus.OK);
    }

    // Delete fluid place
    @DeleteMapping("{placeId}")
    public ResponseEntity<?> deleteFluidPlace(@PathVariable Long placeId) {
        fluidPlaceService.delete(placeId);
        return new ResponseEntity<Message>(new Message("Fluid place with id: " + placeId + " has been removed."),
                HttpStatus.OK);
    }
}