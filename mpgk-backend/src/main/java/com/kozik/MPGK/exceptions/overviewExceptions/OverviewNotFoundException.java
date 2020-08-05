package com.kozik.MPGK.exceptions.overviewExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class OverviewNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public OverviewNotFoundException(Long overviewId) {
        super("Overview with id: " + overviewId + " not found.");
    }
}