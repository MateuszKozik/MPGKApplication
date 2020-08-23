package com.kozik.MPGK.repositories;

import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityGroupRepository extends JpaRepository<ActivityGroup, Long> {

    List<ActivityGroup> findByConnectionInspectionTypeNameAndConnectionDeviceStatus(String name, Boolean status);

    List<ActivityGroup> findByConnectionConnectionId(Long connectionId);

    List<ActivityGroup> findByConnectionInspectionTypeNameAndConnectionDeviceStatusAndConnection(String name,
            Boolean status, Connection connection);

    List<ActivityGroup> findByConnection(Connection connection);

    List<ActivityGroup> findByConnectionConnectionIdAndConnectionStatus(Long connectionId, Boolean status);
}