package com.kozik.MPGK.exceptions.fluidRegistryExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FluidRegistryNotFoundExceptionResponse {

    private String fluidRegistryNotFound;
}