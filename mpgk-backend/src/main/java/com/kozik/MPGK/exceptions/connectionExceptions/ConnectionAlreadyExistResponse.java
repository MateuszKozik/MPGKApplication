package com.kozik.MPGK.exceptions.connectionExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConnectionAlreadyExistResponse {

    private String connectionAlreadyExist;
}