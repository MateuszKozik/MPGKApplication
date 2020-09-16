package com.kozik.MPGK.controllers;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import com.kozik.MPGK.services.InspectionService;
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

@RestController
@CrossOrigin
@RequestMapping("/api/generate")
public class PDFGeneratorController {

    @Autowired
    private InspectionService inspectionService;

    @GetMapping(value = "/inspection-report/{connectionId}/{startTime}/{endTime}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> generateInspectionReport(@PathVariable Long connectionId,
            @PathVariable String startTime, @PathVariable String endTime) throws IOException {
        List<InspectionObject> inspections = inspectionService
                .getInspectionByConnectionAndStartTimeAndEndTime(connectionId, startTime, endTime);
        ByteArrayInputStream bis = InspectionPdfGenerator.generateInspectionReport(inspections);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=inspections.pdf");

        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
