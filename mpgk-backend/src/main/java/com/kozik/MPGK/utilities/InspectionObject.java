package com.kozik.MPGK.utilities;

import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Inspection;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InspectionObject {

    private ActivityGroup activityGroup;
    private List<Inspection> inspections;
    private Boolean showEmsr = false;
    private Boolean showSetting = false;
    String startTime;
    String endTime;
}