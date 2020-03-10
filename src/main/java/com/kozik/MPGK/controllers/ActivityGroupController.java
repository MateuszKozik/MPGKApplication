package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.services.ActivityGroupService;
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
public class ActivityGroupController {

    @Autowired private ActivityGroupService activityGroupService;

    //Get all activities groups
    @GetMapping("/groups")
    public ResponseEntity<List<ActivityGroup>> getActivityGroups(){
        List<ActivityGroup> activityGroups = activityGroupService.listAll();
        if(activityGroups.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<ActivityGroup>>(activityGroups, HttpStatus.OK);
    }

    //Get single activity group
    @GetMapping("/groups/{groupId}")
    public ResponseEntity<?> getActivityGroup(@PathVariable("groupId")Long groupId){
        if(!activityGroupService.isActivityGroupExist(groupId)){
            return new ResponseEntity<>(new ErrorMessage("Group with id " + groupId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        ActivityGroup activityGroup = activityGroupService.get(groupId);
        return new ResponseEntity<ActivityGroup>(activityGroup, HttpStatus.OK);
    }

    //Create activity group
    @PostMapping("/groups")
    public ResponseEntity<?> createActivityGroup(@RequestBody ActivityGroup activityGroup, UriComponentsBuilder builder){
        Long groupId = activityGroup.getGroupId();
        if(groupId != null){
            return new ResponseEntity<>(new ErrorMessage("Unable to create. Group with id " + groupId 
            + " already exist."), HttpStatus.CONFLICT);
        }
        activityGroupService.save(activityGroup);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/groups/{groupId}").buildAndExpand(activityGroup.getGroupId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Update activity group
    @PutMapping("/groups/{groupId}")
    public ResponseEntity<?> updateActivityGroup(@PathVariable("groupId")Long groupId, @RequestBody ActivityGroup activityGroup){
        if(!activityGroupService.isActivityGroupExist(groupId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to update. Group with id " + groupId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        ActivityGroup currentActivityGroup = activityGroupService.get(groupId);
        currentActivityGroup.setName(activityGroup.getName());
        activityGroupService.save(currentActivityGroup);
        return new ResponseEntity<ActivityGroup>(currentActivityGroup, HttpStatus.OK);
    }

    //Delete activity group
    @DeleteMapping("/groups/{groupId}")
    public ResponseEntity<?> deleteActivityGroup(@PathVariable("groupId")Long groupId){
        if(!activityGroupService.isActivityGroupExist(groupId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. Group with id " + groupId + " not found"),
            HttpStatus.NOT_FOUND);
        }
        activityGroupService.delete(groupId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}