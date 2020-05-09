package com.kozik.MPGK.exceptions.overviewTypeExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class OverviewTypeNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public OverviewTypeNotFoundException(Long overviewTypeId) {
        super("Overview type with id: " + overviewTypeId + " not found.");
    }

}