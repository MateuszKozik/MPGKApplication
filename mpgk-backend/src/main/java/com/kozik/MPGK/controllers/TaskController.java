package com.kozik.MPGK.controllers;

import java.security.Principal;

import com.kozik.MPGK.services.TaskService;
import com.kozik.MPGK.utilities.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Generate daily inspections
    @PostMapping("/daily/{connectionId}")
    public ResponseEntity<?> crateDailyInspections(@PathVariable Long connectionId) {
        taskService.daily(connectionId);
        return new ResponseEntity<>(new Message("Daily inspections have been generated."), HttpStatus.CREATED);
    }

    // Generate weekly inspections
    @PostMapping("/weekly/{connectionId}")
    public ResponseEntity<?> createWeeklyInspections(@PathVariable Long connectionId) {
        taskService.weekly(connectionId);
        return new ResponseEntity<>(new Message("Weekly inspections have been generated."), HttpStatus.CREATED);
    }

    // Generate day shift inspections
    @PostMapping("/day-shift/{connectionId}")
    public ResponseEntity<?> createDayShiftInspections(@PathVariable Long connectionId) {
        taskService.dayShift(connectionId);
        return new ResponseEntity<>(new Message("Day shift inspections have been generated."), HttpStatus.CREATED);
    }

    // Generate two monts inspections
    @PostMapping("/two-months/{connectionId}")
    public ResponseEntity<?> createTwoMonthsInspections(@PathVariable Long connectionId) {
        taskService.everyTwoMonths(connectionId);
        return new ResponseEntity<>(new Message("Two months inspections have been generated."), HttpStatus.CREATED);
    }

    // Generate yearly inspections
    @PostMapping("/yearly/{connectionId}")
    public ResponseEntity<?> createYearltInspections(@PathVariable Long connectionId) {
        taskService.yearly(connectionId);
        return new ResponseEntity<>(new Message("Yearly inspections have been generated."), HttpStatus.CREATED);
    }

    // Generate on demand inspections
    @PostMapping("/on-demand/{connectionId}")
    public ResponseEntity<?> createOnDemandInspections(@PathVariable Long connectionId, Principal principal) {
        taskService.onDemand(connectionId, principal);
        return new ResponseEntity<>(new Message("On demand inspections have been generated."), HttpStatus.CREATED);
    }
}