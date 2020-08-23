package com.kozik.MPGK.exceptions.inspectionTypeExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InspectionTypeAlreadyExistResponse {

    private String inspectionTypeAlreadyExist;
}