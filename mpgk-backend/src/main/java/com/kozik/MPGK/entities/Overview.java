package com.kozik.MPGK.entities;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "overviews")
public class Overview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "overview_id", nullable = false)
    private Long overviewId;

    @NotBlank(message = "Status przeglądu jest wymagany")
    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @NotNull(message = "Czas rozpoczęcia przeglądu jest wymagany")
    @Column(name = "start_time", nullable = false, length = 20)
    private LocalDateTime startTime;

    @NotNull(message = "Czas zakończenia przeglądu jest wymagany")
    @Column(name = "end_time", nullable = false, length = 20)
    private LocalDateTime endTime;

    @Column(name = "parameter", nullable = true, length = 50)
    private String parameter;

    @Column(name = "comment", nullable = true, length = 100)
    private String comment;

    @ManyToOne
    @JoinColumn(name = "person_id", nullable = true)
    private Person person;

    @ManyToOne
    @JoinColumn(name = "supervisor_id", nullable = true)
    private Person supervisor;

    @ManyToOne
    @JoinColumn(name = "activity_id", nullable = true)
    private Activity activity;

    public String getStartTime() {
        if (startTime != null) {
            return startTime.toString();
        } else {
            return "";
        }
    }

    public void setStartTime(String startTime) {
        LocalDateTime dataTime = LocalDateTime.parse(startTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        this.startTime = dataTime;
    }

    public String getEndTime() {
        if (endTime != null) {
            return endTime.toString();
        } else {
            return "";
        }
    }

    public void setEndTime(String endTime) {
        LocalDateTime dataTime = LocalDateTime.parse(endTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        this.endTime = dataTime;
    }
}