package com.kozik.MPGK.repositories;

import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityGroupRepository extends JpaRepository<ActivityGroup, Long> {

    List<ActivityGroup> findByConnectionOverviewTypeNameAndConnectionDeviceStatus(String name, Boolean status);
}