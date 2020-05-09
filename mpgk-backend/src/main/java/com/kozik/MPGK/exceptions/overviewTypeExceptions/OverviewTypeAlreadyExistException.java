package com.kozik.MPGK.exceptions.overviewTypeExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class OverviewTypeAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public OverviewTypeAlreadyExistException(Long overviewTypeId) {
        super("Overview type with id: " + overviewTypeId + " already exist.");
    }
}