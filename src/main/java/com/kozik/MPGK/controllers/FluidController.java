package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Fluid;
import com.kozik.MPGK.services.FluidService;
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
public class FluidController {

    @Autowired private FluidService fluidService;

    //Get all fluids
    @GetMapping("/fluids")
    public ResponseEntity<List<Fluid>> getFluids(){
        List<Fluid> fluids = fluidService.listAll();
        if(fluids.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Fluid>>(fluids, HttpStatus.OK);
    }

    //Get single fluid
    @GetMapping("/fluids/{fluidId}")
    public ResponseEntity<?> getFluid(@PathVariable("fluidId")Long fluidId){
        if(!fluidService.isFluidExist(fluidId)){
            return new ResponseEntity<>(new ErrorMessage("Fluid with id " + fluidId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Fluid fluid = fluidService.get(fluidId);
        return new ResponseEntity<Fluid>(fluid, HttpStatus.OK);
    }

    //Create fluid
    @PostMapping("/fluids")
    public ResponseEntity<?> createFluid(@RequestBody Fluid fluid, UriComponentsBuilder builder){
        Long fluidId = fluid.getFluidId();
        if(fluidId != null){
            return new ResponseEntity<>(new ErrorMessage("Unable to create. Fluid with id " + fluidId 
            + " already exist."), HttpStatus.CONFLICT);
        }
        fluidService.save(fluid);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/fluids/{fluidId}").buildAndExpand(fluid.getFluidId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Update fluid
    @PutMapping("/fluids/{fluidId}")
    public ResponseEntity<?> updateFluid(@PathVariable("fluidId")Long fluidId, @RequestBody Fluid fluid){
        if(!fluidService.isFluidExist(fluidId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to update. Fluid with id " + fluidId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Fluid currentFluid = fluidService.update(fluidId, fluid);
        return new ResponseEntity<Fluid>(currentFluid, HttpStatus.OK);
    }

    //Delete fluid
    @DeleteMapping("/fluids/{fluidId}")
    public ResponseEntity<?> deleteFluid(@PathVariable("fluidId")Long fluidId){
        if(!fluidService.isFluidExist(fluidId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. Fluid with id " + fluidId + " not found"),
            HttpStatus.NOT_FOUND);
        }
        fluidService.delete(fluidId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}