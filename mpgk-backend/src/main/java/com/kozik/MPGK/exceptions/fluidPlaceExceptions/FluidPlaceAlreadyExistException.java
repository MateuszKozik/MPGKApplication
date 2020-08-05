package com.kozik.MPGK.exceptions.fluidPlaceExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class FluidPlaceAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public FluidPlaceAlreadyExistException(Long placeId) {
        super("Fluid place with id: " + placeId + " already exist.");
    }
}