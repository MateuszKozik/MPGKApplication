package com.kozik.MPGK.exceptions.fluidExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FluidAlreadyExistResponse {

    private String fluidAlreadyExist;
}