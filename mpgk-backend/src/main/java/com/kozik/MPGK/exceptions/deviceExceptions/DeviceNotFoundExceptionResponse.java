package com.kozik.MPGK.exceptions.deviceExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeviceNotFoundExceptionResponse {

    private String deviceNotFound;
}