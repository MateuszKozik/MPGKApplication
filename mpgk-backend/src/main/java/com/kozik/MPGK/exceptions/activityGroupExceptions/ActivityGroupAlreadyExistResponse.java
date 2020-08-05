package com.kozik.MPGK.exceptions.activityGroupExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActivityGroupAlreadyExistResponse {

    private String activityGroupAlreadyExist;
}