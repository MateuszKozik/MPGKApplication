package com.kozik.MPGK.exceptions.personExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PersonNotFoundExceptionResponse {

    private String PersonNotFound;
}