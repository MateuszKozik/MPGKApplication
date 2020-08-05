package com.kozik.MPGK.exceptions.fluidRegistryExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FluidRegistryNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public FluidRegistryNotFoundException(Long registryId) {
        super("Fluid registry with id: " + registryId + " not found.");
    }

}