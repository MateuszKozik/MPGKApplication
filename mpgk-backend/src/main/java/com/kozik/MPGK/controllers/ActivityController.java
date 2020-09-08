package com.kozik.MPGK.controllers;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.kozik.MPGK.services.MapValidationErrorService;

import java.util.ArrayList;

import javax.validation.Valid;

import com.kozik.MPGK.utilities.ActivityObject;
import com.kozik.MPGK.utilities.Message;
import org.springframework.validation.BindingResult;

@RestController
@CrossOrigin
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all activities
    @GetMapping("")
    public Iterable<Activity> getActivities() {
        return activityService.listAll();
    }

    // Get single activity
    @GetMapping("/{activityId}")
    public ResponseEntity<?> getActivity(@PathVariable Long activityId) {
        return new ResponseEntity<Activity>(activityService.get(activityId), HttpStatus.OK);
    }

    // Create activity
    @PostMapping("")
    public ResponseEntity<?> createActivity(@Valid @RequestBody Activity activity, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Activity>(activityService.save(activity), HttpStatus.CREATED);
    }

    // Update activity
    @PutMapping("/{activityId}")
    public ResponseEntity<?> updateupdateActivityFluid(@PathVariable Long activityId,
            @Valid @RequestBody Activity activity, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Activity>(activityService.update(activityId, activity), HttpStatus.OK);
    }

    // Delete activity
    @DeleteMapping("/{activityId}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long activityId) {
        activityService.delete(activityId);
        return new ResponseEntity<Message>(new Message("Activity with id: " + activityId + " has been removed."),
                HttpStatus.OK);
    }

    // Get activities by connection
    @GetMapping("/list/{connectionId}")
    public ResponseEntity<?> getInspectionsByConnection(@PathVariable Long connectionId) {
        return new ResponseEntity<ArrayList<ActivityObject>>(activityService.getActivitiesByConnection(connectionId),
                HttpStatus.OK);
    }
}