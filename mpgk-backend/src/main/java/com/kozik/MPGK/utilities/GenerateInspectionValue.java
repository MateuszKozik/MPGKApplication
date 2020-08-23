package com.kozik.MPGK.utilities;

import com.kozik.MPGK.entities.Inspection;
import lombok.Getter;

@Getter
public class GenerateInspectionValue {

    private String todayValue;
    private String yesterdayValue;

    public GenerateInspectionValue(Inspection inspection) {

        if (inspection != null) {
            if (inspection.getParameter() == null) {
                this.yesterdayValue = "Nie podano";
            } else {
                this.yesterdayValue = inspection.getParameter();
            }
        } else {
            this.yesterdayValue = "Nie podano";
        }

        if (this.yesterdayValue.equals("Nie podano")) {
            this.todayValue = "1 1";
        } else if (this.yesterdayValue.equals("1 1")) {
            this.todayValue = "2 2";
        } else if (this.yesterdayValue.equals("2 2")) {
            this.todayValue = "3 3";
        } else if (this.yesterdayValue.equals("3 3")) {
            this.todayValue = "4 4";
        } else if (this.yesterdayValue.equals("4 4")) {
            this.todayValue = "5 5";
        } else if (this.yesterdayValue.equals("5 5")) {
            this.todayValue = "6 6";
        } else if (this.yesterdayValue.equals("6 6")) {
            this.todayValue = "1 1";
        } else {
            this.todayValue = "1 1";
        }
    }

    public GenerateInspectionValue() {
        todayValue = "";
        yesterdayValue = "";
    }
}