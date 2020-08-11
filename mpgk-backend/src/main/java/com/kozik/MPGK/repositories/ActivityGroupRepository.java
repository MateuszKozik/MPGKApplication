package com.kozik.MPGK.repositories;

import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityGroupRepository extends JpaRepository<ActivityGroup, Long> {

    List<ActivityGroup> findByConnectionOverviewTypeNameAndConnectionDeviceStatus(String name, Boolean status);

    List<ActivityGroup> findByConnectionOverviewTypeNameAndConnectionDeviceStatusAndConnection(String name,
            Boolean status, Connection connection);

    List<ActivityGroup> findByConnection(Connection connection);
}