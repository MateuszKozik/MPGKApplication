package com.kozik.MPGK.exceptions.activityGroupExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ActivityGroupNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ActivityGroupNotFoundException(Long groupId) {
        super("Activity group with id: " + groupId + " not found.");
    }
}