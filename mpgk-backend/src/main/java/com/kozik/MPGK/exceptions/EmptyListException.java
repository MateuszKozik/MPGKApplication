package com.kozik.MPGK.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EmptyListException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public EmptyListException(String name) {
        super(name + " list is empty");
    }

}