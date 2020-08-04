package com.kozik.MPGK.exceptions.personExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class PersonAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public PersonAlreadyExistException(Long personId) {
        super("Person with id: " + personId + " already exist.");
    }
}