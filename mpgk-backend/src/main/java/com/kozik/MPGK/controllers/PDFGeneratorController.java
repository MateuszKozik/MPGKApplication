package com.kozik.MPGK.controllers;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import com.kozik.MPGK.services.ActivityService;
import com.kozik.MPGK.services.InspectionService;
import com.kozik.MPGK.utilities.ActivityObject;
import com.kozik.MPGK.utilities.ActivityPdfGenerator;
import com.kozik.MPGK.utilities.InspectionObject;
import com.kozik.MPGK.utilities.InspectionPdfGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@CrossOrigin
@Api(tags = "pdf generating", description = "Operations about pdf generating")
@RequestMapping("/api/generate")
public class PDFGeneratorController {

        @Autowired
        private InspectionService inspectionService;

        @Autowired
        private ActivityService activityService;

        // Generate pdf with inspections by connection id and date of inspection
        @ApiOperation(value = "Generate pdf with inspections by connection id and date of inspection")
        @GetMapping(value = "/inspection-report/{connectionId}/{startTime}/{endTime}", produces = MediaType.APPLICATION_PDF_VALUE)
        public ResponseEntity<InputStreamResource> generateInspectionReport(
                        @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId,
                        @ApiParam(value = "Starting date", example = "2020-11-01T00:01") @PathVariable String startTime,
                        @ApiParam(value = "End date", example = "2020-12-31T23:59") @PathVariable String endTime)
                        throws IOException {
                List<InspectionObject> inspections = inspectionService
                                .getInspectionByConnectionAndStartTimeAndEndTime(connectionId, startTime, endTime);
                ByteArrayInputStream bis = InspectionPdfGenerator.generateInspectionReport(inspections);

                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Disposition", "attachment; filename=inspections.pdf");

                return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                                .body(new InputStreamResource(bis));
        }

        // Generate pdf with inspections by connection id
        @ApiOperation(value = "Generate pdf with inspections by connection id")
        @GetMapping("/activity-report/{connectionId}")
        public ResponseEntity<InputStreamResource> generateActivityReport(
                        @ApiParam(value = "Unique id of connection", example = "123") @PathVariable Long connectionId)
                        throws IOException {
                List<ActivityObject> activities = activityService.getActivitiesByConnection(connectionId);
                ByteArrayInputStream bis = ActivityPdfGenerator.generateActivityReport(activities);

                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Disposition", "attachment; filename=activities.pdf");

                return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                                .body(new InputStreamResource(bis));
        }
}
