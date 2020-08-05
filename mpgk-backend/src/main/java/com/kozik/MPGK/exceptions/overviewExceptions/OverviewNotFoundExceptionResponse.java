package com.kozik.MPGK.exceptions.overviewExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OverviewNotFoundExceptionResponse {

    private String overviewNotFound;
}