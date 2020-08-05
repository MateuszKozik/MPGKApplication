package com.kozik.MPGK.exceptions.fluidRegistryExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class FluidRegistryAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public FluidRegistryAlreadyExistException(Long registryId) {
        super("Fluid registry with id: " + registryId + " already exist.");
    }
}