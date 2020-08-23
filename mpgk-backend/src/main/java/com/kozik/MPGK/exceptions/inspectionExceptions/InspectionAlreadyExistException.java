package com.kozik.MPGK.exceptions.inspectionExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class InspectionAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InspectionAlreadyExistException(Long inspectionId) {
        super("Inspection with id: " + inspectionId + " already exist.");
    }
}