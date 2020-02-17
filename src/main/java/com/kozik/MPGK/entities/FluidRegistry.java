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
@Table(name = "fluids_registry")
@Data
public class FluidRegistry {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "registry_id", nullable = false)
    private Long registryId;

    @Column(name = "quantity", nullable = false)
    private Long quantity;

    @Column(name = "datetime", nullable = false)
    private LocalDateTime datetime;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private Agent agent;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

    public FluidRegistry() {}

    public String getDatetime() {      
        if(datetime !=null){
            return datetime.toString();
        }else{
            return "";
        }
    }

    public void setDatetime(String datetime) {       
        LocalDateTime formatted = LocalDateTime.parse(datetime,DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        this.datetime = formatted;
    }
}