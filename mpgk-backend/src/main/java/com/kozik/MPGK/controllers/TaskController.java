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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@CrossOrigin
@Api(tags = "tasks", description = "Operations about generating tasks")
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Generate daily inspections
    @ApiOperation(value = "Generate daily inspections by connection id")
    @PostMapping("/daily/{connectionId}")
    public ResponseEntity<?> crateDailyInspections(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId) {
        taskService.daily(connectionId);
        return new ResponseEntity<>(new Message("Daily inspections have been generated."), HttpStatus.CREATED);
    }

    // Generate weekly inspections
    @ApiOperation(value = "Generate weekly inspections by connection id")
    @PostMapping("/weekly/{connectionId}")
    public ResponseEntity<?> createWeeklyInspections(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId) {
        taskService.weekly(connectionId);
        return new ResponseEntity<>(new Message("Weekly inspections have been generated."), HttpStatus.CREATED);
    }

    // Generate day shift inspections
    @ApiOperation(value = "Generate day shift inspections by connection id")
    @PostMapping("/day-shift/{connectionId}")
    public ResponseEntity<?> createDayShiftInspections(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId) {
        taskService.dayShift(connectionId);
        return new ResponseEntity<>(new Message("Day shift inspections have been generated."), HttpStatus.CREATED);
    }

    // Generate two months inspections
    @ApiOperation(value = "Generate two months inspections by connection id")
    @PostMapping("/two-months/{connectionId}")
    public ResponseEntity<?> createTwoMonthsInspections(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId) {
        taskService.everyTwoMonths(connectionId);
        return new ResponseEntity<>(new Message("Two months inspections have been generated."), HttpStatus.CREATED);
    }

    // Generate yearly inspections
    @ApiOperation(value = "Generate yearly inspections by connection id")
    @PostMapping("/yearly/{connectionId}")
    public ResponseEntity<?> createYearltInspections(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId) {
        taskService.yearly(connectionId);
        return new ResponseEntity<>(new Message("Yearly inspections have been generated."), HttpStatus.CREATED);
    }

    // Generate on demand inspections
    @ApiOperation(value = "Generate on demand inspections by connection id")
    @PostMapping("/on-demand/{connectionId}")
    public ResponseEntity<?> createOnDemandInspections(
            @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId,
            @ApiIgnore Principal principal) {
        taskService.onDemand(connectionId, principal);
        return new ResponseEntity<>(new Message("On demand inspections have been generated."), HttpStatus.CREATED);
    }
}