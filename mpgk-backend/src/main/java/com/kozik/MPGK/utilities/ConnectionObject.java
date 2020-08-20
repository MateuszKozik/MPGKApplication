package com.kozik.MPGK.utilities;

import com.kozik.MPGK.entities.Connection;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ConnectionObject {

    private Connection connection;
    private String overviewStatus;
    private Integer overdueCount;
    private String startTime;
    private String endTime;
    private Boolean active = false;
}