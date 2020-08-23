package com.kozik.MPGK.exceptions.inspectionExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InspectionNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InspectionNotFoundException(Long inspectionId) {
        super("Inspection with id: " + inspectionId + " not found.");
    }
}