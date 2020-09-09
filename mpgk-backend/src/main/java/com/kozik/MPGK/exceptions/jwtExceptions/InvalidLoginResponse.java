package com.kozik.MPGK.exceptions.jwtExceptions;

import lombok.Data;

@Data
public class InvalidLoginResponse {
    private String username;
    private String password;

    public InvalidLoginResponse() {
        this.username = "Błędny login";
        this.password = "Błędne hasło";
    }
}