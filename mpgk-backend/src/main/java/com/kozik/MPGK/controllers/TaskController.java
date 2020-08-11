package com.kozik.MPGK.controllers;

import com.kozik.MPGK.services.TaskService;
import com.kozik.MPGK.utilities.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Generate daily overviews
    @PostMapping("/daily")
    public ResponseEntity<?> crateDailyOverviews() {
        taskService.daily();
        return new ResponseEntity<Message>(new Message("Daily overviews have been generated."), HttpStatus.CREATED);
    }

    // Generate weekly overviews
    @PostMapping("/weekly")
    public ResponseEntity<?> createWeeklyOverviews() {
        taskService.weekly();
        return new ResponseEntity<Message>(new Message("Weekly overviews have been generated."), HttpStatus.CREATED);
    }

    // Generate day shift overviews
    @PostMapping("/day-shift")
    public ResponseEntity<?> createDayShiftOverviews() {
        taskService.dayShift();
        return new ResponseEntity<Message>(new Message("Day shift overviews have been generated."), HttpStatus.CREATED);
    }

    // Generate two monts overviews
    @PostMapping("/two-months")
    public ResponseEntity<?> createTwoMonthsOverviews() {
        taskService.everyTwoMonths();
        return new ResponseEntity<Message>(new Message("Two months overviews have been generated."),
                HttpStatus.CREATED);
    }

    // Generate yearly overviews
    @PostMapping("/yearly")
    public ResponseEntity<?> createYearltOverviews() {
        taskService.yearly();
        return new ResponseEntity<Message>(new Message("Yearly overviews have been generated."), HttpStatus.CREATED);
    }

    // Generate on demand overviews
    @PostMapping("/on-demand")
    public ResponseEntity<?> createOnDemandOverviews() {
        taskService.onDemand();
        return new ResponseEntity<Message>(new Message("On demand overviews have been generated."), HttpStatus.CREATED);
    }
}