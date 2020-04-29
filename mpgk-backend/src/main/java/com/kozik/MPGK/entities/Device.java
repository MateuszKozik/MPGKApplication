package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "devices")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id", nullable = false)
    private Long deviceId;

    @NotBlank(message = "Nazwa urządzenia jest wymagana")
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull(message = "Status urządzenia jest wymagany")
    @Column(name = "status", nullable = false)
    private Boolean status;

    @NotNull(message = "Należy wybrać odpowiednią opcję")
    @Column(name = "type", nullable = false)
    private Boolean type;

    @OneToMany(mappedBy = "device")
    private List<FluidRegistry> fluidRegistries;

    @OneToMany(mappedBy = "device")
    private List<Connection> connections;
}