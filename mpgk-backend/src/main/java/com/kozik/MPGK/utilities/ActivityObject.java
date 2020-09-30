package com.kozik.MPGK.utilities;

import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityObject {

    private ActivityGroup activityGroup;
    private List<Activity> activities;
    private Boolean showEmsr = false;
    private Boolean showSetting = false;
}