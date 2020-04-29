package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.FluidRegistry;
import com.kozik.MPGK.services.FluidRegistryService;
import com.kozik.MPGK.utilities.ErrorMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class FluidRegistryController {

    @Autowired private FluidRegistryService fluidRegistryService;

    //Get all fluid registries
    @GetMapping("/fluid-registries")
    public ResponseEntity<List<FluidRegistry>> getFluidRegistries(){
        List<FluidRegistry> fluidRegistries = fluidRegistryService.listAll();
        if(fluidRegistries.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<FluidRegistry>>(fluidRegistries, HttpStatus.OK);
    }

    //Get single fluid registry
    @GetMapping("/fluid-registries/{registryId}")
    public ResponseEntity<?> getFluidRegistry(@PathVariable("registryId")Long registryId){
        if(!fluidRegistryService.isFluidRegistryExist(registryId)){
            return new ResponseEntity<>(new ErrorMessage("Registry with id " + registryId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        FluidRegistry fluidRegistry = fluidRegistryService.get(registryId);
        return new ResponseEntity<FluidRegistry>(fluidRegistry, HttpStatus.OK);
    }

    //Create fluid registry
    @PostMapping("/fluid-registries")
    public ResponseEntity<?> createFluidRegistry(@RequestBody FluidRegistry fluidRegistry,
    UriComponentsBuilder builder){
        Long registryId = fluidRegistry.getRegistryId();
        if(registryId != null){
            return new ResponseEntity<>(new ErrorMessage("Unable to create. Registry with id " + registryId 
            + " already exist."), HttpStatus.CONFLICT);
        }
        fluidRegistryService.save(fluidRegistry);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/fluid-registries/{registryId}").buildAndExpand(fluidRegistry.getRegistryId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Update fluid registry
    @PutMapping("/fluid-registries/{registryId}")
    public ResponseEntity<?> updateFluidRegistry(@PathVariable("registryId")Long registryId, @RequestBody FluidRegistry fluidRegistry){
        if(!fluidRegistryService.isFluidRegistryExist(registryId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to update. Registry with id " + registryId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        FluidRegistry currentFluidRegistry = fluidRegistryService.update(registryId, fluidRegistry);
        return new ResponseEntity<FluidRegistry>(currentFluidRegistry, HttpStatus.OK);
    }

    //Delete fluid registry
    @DeleteMapping("/fluid-registries/{registryId}")
    public ResponseEntity<?> deleteFluidRegistry(@PathVariable("registryId")Long registryId){
        if(!fluidRegistryService.isFluidRegistryExist(registryId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. Registry with id " + registryId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        fluidRegistryService.delete(registryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}