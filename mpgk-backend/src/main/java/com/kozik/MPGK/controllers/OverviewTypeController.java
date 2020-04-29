package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.OverviewType;
import com.kozik.MPGK.services.OverviewTypeService;
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
public class OverviewTypeController {

    @Autowired private OverviewTypeService overviewTypeService;

    //Get all overview types
    @GetMapping("/overview-types")
    public ResponseEntity<List<OverviewType>> getOverviewTypes(){
        List<OverviewType> overviewTypes = overviewTypeService.listAll();
        if(overviewTypes.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<OverviewType>>(overviewTypes, HttpStatus.OK);
    }

    //Get single overview type
    @GetMapping("/overview-types/{typeId}")
    public ResponseEntity<?> getOverviewType(@PathVariable("typeId")Long typeId){
        if(!overviewTypeService.isOverviewTypeExist(typeId)){
            return new ResponseEntity<>(new ErrorMessage("Overview type with id " + typeId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        OverviewType overviewType = overviewTypeService.get(typeId);
        return new ResponseEntity<OverviewType>(overviewType, HttpStatus.OK);
    }

    //Create overview type
    @PostMapping("/overview-types")
    public ResponseEntity<?> createOverviewType(@RequestBody OverviewType overviewType, UriComponentsBuilder builder){
        Long typeId = overviewType.getTypeId();
        if(typeId != null){
            return new ResponseEntity<>(new ErrorMessage("Unable to create. Overview type with id " + typeId 
            + " already exist."), HttpStatus.CONFLICT);
        }
        overviewTypeService.save(overviewType);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/overview-types/{typeId}").buildAndExpand(overviewType.getTypeId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Update overview type
    @PutMapping("/overview-types/{typeId}")
    public ResponseEntity<?> updateOvrviewType(@PathVariable("typeId")Long typeId, @RequestBody OverviewType overviewType){
        if(!overviewTypeService.isOverviewTypeExist(typeId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to update. Overview type with id " + typeId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        OverviewType currentOverviewType = overviewTypeService.update(typeId, overviewType);
        return new ResponseEntity<OverviewType>(currentOverviewType, HttpStatus.OK);
    }

    //Delete overview type
    @DeleteMapping("/overview-types/{typeId}")
    public ResponseEntity<?> deleteOverviewType(@PathVariable("typeId")Long typeId){
        if(!overviewTypeService.isOverviewTypeExist(typeId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. Overview type with id " + typeId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        overviewTypeService.delete(typeId);
        return new ResponseEntity<OverviewType>(HttpStatus.NO_CONTENT);
    }
}