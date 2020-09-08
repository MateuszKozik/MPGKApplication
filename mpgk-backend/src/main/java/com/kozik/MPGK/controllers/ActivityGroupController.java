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
import com.kozik.MPGK.services.MapValidationErrorService;
import javax.validation.Valid;
import org.springframework.validation.BindingResult;
import com.kozik.MPGK.utilities.Message;

@RestController
@CrossOrigin
@RequestMapping("/api/groups")
public class ActivityGroupController {

    @Autowired
    private ActivityGroupService activityGroupService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all activities groups
    @GetMapping("")
    public Iterable<ActivityGroup> getActivityGroups() {
        return activityGroupService.listAll();
    }

    // Get single activity group
    @GetMapping("/{groupId}")
    public ResponseEntity<?> getActivityGroup(@PathVariable Long groupId) {
        return new ResponseEntity<ActivityGroup>(activityGroupService.get(groupId), HttpStatus.OK);
    }

    // Create activity group
    @PostMapping("")
    public ResponseEntity<?> createActivityGroup(@Valid @RequestBody ActivityGroup activityGroup,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<ActivityGroup>(activityGroupService.save(activityGroup), HttpStatus.CREATED);
    }

    // Update activity group
    @PutMapping("/{groupId}")
    public ResponseEntity<?> updateActivityGroup(@PathVariable Long groupId,
            @Valid @RequestBody ActivityGroup activityGroup, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<ActivityGroup>(activityGroupService.update(groupId, activityGroup), HttpStatus.OK);
    }

    // Delete activity group
    @DeleteMapping("/{groupId}")
    public ResponseEntity<?> deleteActivityGroup(@PathVariable Long groupId) {
        activityGroupService.delete(groupId);
        return new ResponseEntity<Message>(new Message("Activity group with id: " + groupId + " has been removed."),
                HttpStatus.OK);
    }
}