package com.kozik.MPGK.controllers;

import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.services.OverviewService;
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
import com.kozik.MPGK.services.MapValidationErrorService;
import org.springframework.validation.BindingResult;
import javax.validation.Valid;
import com.kozik.MPGK.utilities.Message;

@RestController
@RequestMapping("/api/overviews")
public class OverviewController {

    @Autowired
    private OverviewService overviewService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all overviews
    @GetMapping("")
    public Iterable<Overview> getOverviews() {
        return overviewService.listAll();
    }

    // Get single overview
    @GetMapping("/{overviewId}")
    public ResponseEntity<?> getOverview(@PathVariable Long overviewId) {
        return new ResponseEntity<Overview>(overviewService.get(overviewId), HttpStatus.OK);
    }

    // Create overview
    @PostMapping("")
    public ResponseEntity<?> createOverview(@Valid @RequestBody Overview overview, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Overview>(overviewService.save(overview), HttpStatus.CREATED);
    }

    // Update overview
    @PutMapping("/{overviewId}")
    public ResponseEntity<?> updateOverview(@PathVariable Long overviewId, @Valid @RequestBody Overview overview,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Overview>(overviewService.update(overviewId, overview), HttpStatus.OK);
    }

    // Delete overview
    @DeleteMapping("/{overviewId}")
    public ResponseEntity<?> deleteOverview(@PathVariable Long overviewId) {
        overviewService.delete(overviewId);
        return new ResponseEntity<Message>(new Message("Overview with id: " + overviewId + " has been removed."),
                HttpStatus.OK);
    }

}