package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.services.ActivityService;
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
public class ActivityRestController {

    @Autowired private ActivityService activityService;

    //Get all activities
    @GetMapping("/activities")
    public ResponseEntity<List<Activity>> getActivities(){
        List<Activity> activities = activityService.listAll();
        if(activities.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Activity>>(activities, HttpStatus.OK);
    }

    //Get single activity
    @GetMapping("/activities/{activityId}")
    public ResponseEntity<?> getActivity(@PathVariable("activityId")Long activityId){
        if(!activityService.isActivityExist(activityId)){
            return new ResponseEntity<>(new ErrorMessage("Activity with id " + activityId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Activity activity = activityService.get(activityId);
        return new ResponseEntity<Activity>(activity, HttpStatus.OK);
    }

    //Create activity
    @PostMapping("/activities")
    public ResponseEntity<?> createActivity(@RequestBody Activity activity, UriComponentsBuilder builder){
        Long activityId = activity.getActivityId();
        if(activityId != null){
            return new ResponseEntity<>(new ErrorMessage("Unable to create. Activity with id " + activityId 
            + " already exist."), HttpStatus.CONFLICT);
        }
        activityService.save(activity);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/activities/{activityId}").buildAndExpand(activity.getActivityId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Update activity
    @PutMapping("/activities/{activityId}")
    public ResponseEntity<?> updateActivity(@PathVariable("activityId")Long activityId, @RequestBody Activity activity){
        if(!activityService.isActivityExist(activityId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to update. Activity with id " + activityId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Activity currentActivity = activityService.get(activityId);
        currentActivity.setName(activity.getName());
        currentActivity.setType(activity.getType());
        currentActivity.setEmsr(activity.getEmsr());
        currentActivity.setSetting(activity.getSetting());
        activityService.save(currentActivity);
        return new ResponseEntity<Activity>(currentActivity, HttpStatus.OK);
    }

    //Delete activity
    @DeleteMapping("/activities/{activityId}")
    public ResponseEntity<?> deleteActivity(@PathVariable("activityId")Long activityId){
        if(!activityService.isActivityExist(activityId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. Activity with id " + activityId + " not found"),
            HttpStatus.NOT_FOUND);
        }
        activityService.delete(activityId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}