package com.kozik.MPGK.exceptions.fluidExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class FluidAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public FluidAlreadyExistException(Long fluidId) {
        super("Fluid with id: " + fluidId + " already exist.");
    }
}