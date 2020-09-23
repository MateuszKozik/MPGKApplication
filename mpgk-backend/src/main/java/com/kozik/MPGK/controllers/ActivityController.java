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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import com.kozik.MPGK.services.MapValidationErrorService;

import javax.validation.Valid;
import com.kozik.MPGK.utilities.Message;
import org.springframework.validation.BindingResult;

@RestController
@CrossOrigin
@Api(tags = "activities", description = "Operations about activity")
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all activities
    @ApiOperation(value = "Get all activities")
    @GetMapping("")
    public Iterable<Activity> getActivities() {
        return activityService.listAll();
    }

    // Get single activity
    @ApiOperation(value = "Get activity by id")
    @GetMapping("/{activityId}")
    public ResponseEntity<Activity> getActivity(
            @ApiParam(value = "Unique id of activity", example = "123") @PathVariable Long activityId) {
        return new ResponseEntity<>(activityService.get(activityId), HttpStatus.OK);
    }

    // Create activity
    @ApiOperation(value = "Create new activity")
    @PostMapping("")
    public ResponseEntity<?> createActivity(
            @ApiParam(value = "Created activity object") @Valid @RequestBody Activity activity, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(activityService.save(activity), HttpStatus.CREATED);
    }

    // Update activity
    @ApiOperation(value = "Update activity")
    @PutMapping("/{activityId}")
    public ResponseEntity<?> updateupdateActivityFluid(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long activityId,
            @ApiParam(value = "Updated activity object") @Valid @RequestBody Activity activity, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(activityService.update(activityId, activity), HttpStatus.OK);
    }

    // Delete activity
    @ApiOperation(value = "Delete activity")
    @DeleteMapping("/{activityId}")
    public ResponseEntity<?> deleteActivity(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long activityId) {
        activityService.delete(activityId);
        return new ResponseEntity<>(new Message("Activity with id: " + activityId + " has been removed."),
                HttpStatus.OK);
    }

    // Get activities by connection
    @ApiOperation(value = "Get activities by connection id")
    @GetMapping("/list/{connectionId}")
    public ResponseEntity<?> getInspectionsByConnection(
            @ApiParam(value = "Unique connection id", example = "123") @PathVariable Long connectionId) {
        return new ResponseEntity<>(activityService.getActivitiesByConnection(connectionId), HttpStatus.OK);
    }
}