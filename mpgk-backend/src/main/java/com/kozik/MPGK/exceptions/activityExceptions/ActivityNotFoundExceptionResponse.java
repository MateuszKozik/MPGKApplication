package com.kozik.MPGK.exceptions.activityExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActivityNotFoundExceptionResponse {

    private String activityNotFound;
}