package com.kozik.MPGK.exceptions.roleExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoleNotFoundExceptionResponse {

    private String roleNotFound;
}