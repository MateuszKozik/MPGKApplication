package com.kozik.MPGK.exceptions.connectionExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ConnectionAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ConnectionAlreadyExistException(Long connectionId) {
        super("Connection with id: " + connectionId + " already exist.");
    }

}