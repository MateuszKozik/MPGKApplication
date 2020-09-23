package com.kozik.MPGK.controllers;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.services.ActivityGroupService;
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
import org.springframework.validation.BindingResult;
import com.kozik.MPGK.utilities.Message;

@RestController
@CrossOrigin
@Api(tags = "activities groups", description = "Operations about activity group")
@RequestMapping("/api/groups")
public class ActivityGroupController {

    @Autowired
    private ActivityGroupService activityGroupService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all activities groups
    @ApiOperation(value = "Get all activities groups")
    @GetMapping("")
    public Iterable<ActivityGroup> getActivityGroups() {
        return activityGroupService.listAll();
    }

    // Get single activity group
    @ApiOperation(value = "Get activity group by id")
    @GetMapping("/{groupId}")
    public ResponseEntity<?> getActivityGroup(
            @ApiParam(value = "Unique id of activity group", example = "123") @PathVariable Long groupId) {
        return new ResponseEntity<>(activityGroupService.get(groupId), HttpStatus.OK);
    }

    // Create activity group
    @ApiOperation(value = "Create new activity group")
    @PostMapping("")
    public ResponseEntity<?> createActivityGroup(
            @ApiParam(value = "Created activity group object") @Valid @RequestBody ActivityGroup activityGroup,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(activityGroupService.save(activityGroup), HttpStatus.CREATED);
    }

    // Update activity group
    @ApiOperation(value = "Update activity group")
    @PutMapping("/{groupId}")
    public ResponseEntity<?> updateActivityGroup(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long groupId,
            @ApiParam(value = "Updated activity group object") @Valid @RequestBody ActivityGroup activityGroup,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(activityGroupService.update(groupId, activityGroup), HttpStatus.OK);
    }

    // Delete activity group
    @ApiOperation(value = "Delete activity group")
    @DeleteMapping("/{groupId}")
    public ResponseEntity<?> deleteActivityGroup(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long groupId) {
        activityGroupService.delete(groupId);
        return new ResponseEntity<>(new Message("Activity group with id: " + groupId + " has been removed."),
                HttpStatus.OK);
    }
}