package com.kozik.MPGK.exceptions.deviceExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DeviceAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public DeviceAlreadyExistException(Long deviceId) {
        super("Device with id: " + deviceId + " already exist.");
    }

}