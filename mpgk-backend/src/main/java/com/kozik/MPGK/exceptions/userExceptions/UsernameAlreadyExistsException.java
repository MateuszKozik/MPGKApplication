package com.kozik.MPGK.exceptions.userExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UsernameAlreadyExistsException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public UsernameAlreadyExistsException(String username) {
        super("Username: " + username + " already exist");
    }
}