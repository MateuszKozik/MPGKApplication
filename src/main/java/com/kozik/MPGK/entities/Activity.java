package com.kozik.MPGK.entities;

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
@Table(name = "activities")
@Data
public class Activity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "activity_id", nullable = false)
    private Long activityId;

    @Column(name = "name", nullable = false, columnDefinition = "TEXT" )
    private String name;

    @Column(name = "type", nullable = false, length = 25)
    private String type;

    @Column(name = "emsr", nullable = true, length = 25)
    private String emsr;

    
    @Column(name = "setting", nullable = true, length = 35)
    private String setting;

    @ManyToOne
    @JoinColumn(name = "groupId", nullable = true)
    private ActivityGroup activityGroup;

    public Activity(){}

    public Activity(final String name, final String type, final String emsr, final String setting)
    {
        this.name = name;
        this.type = type;
        this.emsr = emsr;
        this.setting = setting;
    }


}