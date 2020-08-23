package com.kozik.MPGK.exceptions.inspectionExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InspectionAlreadyExistResponse {

    private String inspectionAlreadyExist;
}