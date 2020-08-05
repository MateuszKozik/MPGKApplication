package com.kozik.MPGK.exceptions.fluidPlaceExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FluidPlaceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public FluidPlaceNotFoundException(Long placeId) {
        super("Fluid place with id: " + placeId + " not found.");
    }
}