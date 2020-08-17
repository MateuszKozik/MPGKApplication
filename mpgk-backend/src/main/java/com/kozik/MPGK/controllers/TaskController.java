package com.kozik.MPGK.controllers;

import com.kozik.MPGK.services.TaskService;
import com.kozik.MPGK.utilities.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Generate daily overviews
    @PostMapping("/daily/{connectionId}")
    public ResponseEntity<?> crateDailyOverviews(@PathVariable Long connectionId) {
        taskService.daily(connectionId);
        return new ResponseEntity<Message>(new Message("Daily overviews have been generated."), HttpStatus.CREATED);
    }

    // Generate weekly overviews
    @PostMapping("/weekly/{connectionId}")
    public ResponseEntity<?> createWeeklyOverviews(@PathVariable Long connectionId) {
        taskService.weekly(connectionId);
        return new ResponseEntity<Message>(new Message("Weekly overviews have been generated."), HttpStatus.CREATED);
    }

    // Generate day shift overviews
    @PostMapping("/day-shift/{connectionId}")
    public ResponseEntity<?> createDayShiftOverviews(@PathVariable Long connectionId) {
        taskService.dayShift(connectionId);
        return new ResponseEntity<Message>(new Message("Day shift overviews have been generated."), HttpStatus.CREATED);
    }

    // Generate two monts overviews
    @PostMapping("/two-months/{connectionId}")
    public ResponseEntity<?> createTwoMonthsOverviews(@PathVariable Long connectionId) {
        taskService.everyTwoMonths(connectionId);
        return new ResponseEntity<Message>(new Message("Two months overviews have been generated."),
                HttpStatus.CREATED);
    }

    // Generate yearly overviews
    @PostMapping("/yearly/{connectionId}")
    public ResponseEntity<?> createYearltOverviews(@PathVariable Long connectionId) {
        taskService.yearly(connectionId);
        return new ResponseEntity<Message>(new Message("Yearly overviews have been generated."), HttpStatus.CREATED);
    }

    // Generate on demand overviews
    @PostMapping("/on-demand/{connectionId}")
    public ResponseEntity<?> createOnDemandOverviews(@PathVariable Long connectionId) {
        taskService.onDemand(connectionId);
        return new ResponseEntity<Message>(new Message("On demand overviews have been generated."), HttpStatus.CREATED);
    }
}