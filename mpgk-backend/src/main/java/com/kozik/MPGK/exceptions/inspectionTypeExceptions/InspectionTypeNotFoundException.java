package com.kozik.MPGK.exceptions.inspectionTypeExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InspectionTypeNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InspectionTypeNotFoundException(Long typeId) {
        super("Inspection type with id: " + typeId + " not found.");
    }

}