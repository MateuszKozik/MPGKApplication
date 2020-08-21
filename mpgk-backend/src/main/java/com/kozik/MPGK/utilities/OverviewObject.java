package com.kozik.MPGK.utilities;

import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Overview;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OverviewObject {

    private ActivityGroup activityGroup;
    private List<Overview> overviews;
    private Boolean showEmsr = false;
    private Boolean showSetting = false;
}