package com.kozik.MPGK.exceptions.overviewExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class OverviewAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public OverviewAlreadyExistException(Long overviewId) {
        super("Overview with id: " + overviewId + " already exist.");
    }
}