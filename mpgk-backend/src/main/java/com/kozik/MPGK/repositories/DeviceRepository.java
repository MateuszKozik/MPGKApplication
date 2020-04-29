package com.kozik.MPGK.repositories;

import com.kozik.MPGK.entities.Device;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long>{
    
}