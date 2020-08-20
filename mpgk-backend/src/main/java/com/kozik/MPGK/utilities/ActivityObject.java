package com.kozik.MPGK.utilities;

import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ActivityObject {

    private ActivityGroup activityGroup;
    private List<Activity> activities;
}