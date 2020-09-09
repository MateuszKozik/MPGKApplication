package com.kozik.MPGK.exceptions.userExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UsernameAlreadyExistResponse {

    private String username;
}
