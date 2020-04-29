package com.kozik.MPGK.utilities;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Message {
    private String message;

    public String getMessage() {
        return message;
    }
}