package com.kozik.MPGK.utilities;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class OverviewMonths {
    private List<Month> months = new ArrayList<Month>();

    public OverviewMonths() {
        months.add(Month.JANUARY);
        months.add(Month.MARCH);
        months.add(Month.MAY);
        months.add(Month.JULY);
        months.add(Month.SEPTEMBER);
        months.add(Month.NOVEMBER);
    }
}