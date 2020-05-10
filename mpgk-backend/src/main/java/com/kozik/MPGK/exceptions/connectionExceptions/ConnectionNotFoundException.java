package com.kozik.MPGK.exceptions.connectionExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ConnectionNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ConnectionNotFoundException(Long connectionId) {
        super("Connection with id: " + connectionId + " not found.");
    }
}