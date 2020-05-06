package com.kozik.MPGK.exceptions.fluidExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FluidNotFoundExceptionResponse {

    private String fluidNotFound;
}