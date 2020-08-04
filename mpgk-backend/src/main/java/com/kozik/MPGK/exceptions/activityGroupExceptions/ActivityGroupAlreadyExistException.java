package com.kozik.MPGK.exceptions.activityGroupExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ActivityGroupAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ActivityGroupAlreadyExistException(Long groupId) {
        super("Activity group with id: " + groupId + " already exist.");
    }
}