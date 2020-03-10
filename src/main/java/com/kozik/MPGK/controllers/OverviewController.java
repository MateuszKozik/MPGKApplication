package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.services.OverviewService;
import com.kozik.MPGK.utilities.ErrorMessage;
import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
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
public class OverviewController {

    @Autowired private OverviewService overviewService;

    //Get all overviews
    @GetMapping("/overviews")
    public ResponseEntity<List<Overview>> getOverviews(){
        List<Overview> overviews = overviewService.listAll();
        if(overviews.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Overview>>(overviews, HttpStatus.OK);
    }

    //Get single overview
    @GetMapping("/overviews/{overviewId}")
    public ResponseEntity<?> getOverwiew(@PathVariable("overviewId")Long overviewId){
        if(!overviewService.isOverviewExist(overviewId)){
            return new ResponseEntity<>(new ErrorMessage("Overwiew with id " + overviewId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Overview overview = overviewService.get(overviewId);
        return new ResponseEntity<Overview>(overview, HttpStatus.OK);
    }

    //Create overview
    @PostMapping("/overviews")
    public ResponseEntity<?> createOverwiew(@RequestBody Overview overview, UriComponentsBuilder builder){
        Long overviewId = overview.getOverviewId();
        if(overviewId != null){
            return new ResponseEntity<>(new ErrorMessage("Unable to create. Overview with id " + overviewId 
            + " already exist."), HttpStatus.CONFLICT);
        }
        overviewService.save(overview);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/overwiews/{overviewId}").buildAndExpand(overview.getOverviewId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Update overview
    @PutMapping("/overviews/{overviewId}")
    public ResponseEntity<?> updateFluid(@PathVariable("overviewId")Long overviewId, @RequestBody Overview overview){
        if(!overviewService.isOverviewExist(overviewId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to update. Overwiew with id " + overviewId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Overview currentOverview = overviewService.get(overviewId);
        currentOverview.setStatus(overview.getStatus());
        currentOverview.setStartTime(overview.getStartTime());
        currentOverview.setEndTime(overview.getEndTime());
        currentOverview.setParameter(overview.getParameter());
        currentOverview.setComment(overview.getComment());
        overviewService.save(currentOverview);
        return new ResponseEntity<Overview>(currentOverview, HttpStatus.OK);
    }

    //Delete overview
    @DeleteMapping("/overviews/{overviewId}")
    public ResponseEntity<?> deleteOverview(@PathVariable("overviewId")Long overviewId){
        if(!overviewService.isOverviewExist(overviewId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. Overview with id " + overviewId + " not found"),
            HttpStatus.NOT_FOUND);
        }
        overviewService.delete(overviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    
}