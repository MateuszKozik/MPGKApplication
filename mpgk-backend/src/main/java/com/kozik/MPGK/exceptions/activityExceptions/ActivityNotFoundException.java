package com.kozik.MPGK.exceptions.activityExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ActivityNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ActivityNotFoundException(Long activityId) {
        super("Activity with id: " + activityId + " not found.");
    }
}