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

import lombok.Data;

@Entity
@Table(name = "overviews")
@Data
public class Overview{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "overview_id", nullable = false)
    private Long overviewId;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "start_time", nullable = false, length = 10)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false, length = 10)
    private LocalDateTime endTime;

    @Column(name = "parameter", nullable = false, length = 50)
    private String parameter;

    @Column(name = "comment", nullable = false, length = 100)
    private String comment;

    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;
    

    @ManyToOne
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activityId;

    public Overview(){}

    public Overview(String status,String startTime,String endTime,String parameter,String comment)
    {
        this.status = status;
        if(startTime == ""){ this.startTime = null;}
        else{
            this.startTime = LocalDateTime.parse(startTime,DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        }

        if(endTime == ""){ this.endTime = null;}
        else{
            this.endTime = LocalDateTime.parse(endTime,DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        }
        this.parameter = parameter;
        this.comment = comment;
    }

    public String getstartTime() {      
        if(startTime !=null){
            return startTime.toString();
        }else{
            return "";
        }
    }

    public void setstartTime(String startTime) {       
        LocalDateTime dataTime = LocalDateTime.parse(startTime,DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        this.startTime = dataTime;
    }

    public String getendTime() {      
        if(endTime !=null){
            return endTime.toString();
        }else{
            return "";
        }
    }

    public void setendTime(String endTime) {       
        LocalDateTime dataTime = LocalDateTime.parse(endTime,DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        this.endTime = dataTime;
    }

}