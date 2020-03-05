package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "activities_groups")
@Data
public class ActivityGroup{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "group_id", nullable = false)
    private Long groupId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @OneToMany(mappedBy = "activityGroup") 
    private List<Activity> activity;

    @ManyToOne
    @JoinColumn(name = "connection_id")
    private Connection connection;

    public ActivityGroup(){}

    public ActivityGroup(String name)
    {
        this.name = name;
    }

}