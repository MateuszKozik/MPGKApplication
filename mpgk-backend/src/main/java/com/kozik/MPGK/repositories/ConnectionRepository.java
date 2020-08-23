package com.kozik.MPGK.repositories;

import java.util.List;

import com.kozik.MPGK.entities.Connection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    List<Connection> findByInspectionTypeNameNotLikeAndDeviceStatus(String inspectionType, Boolean status);

    List<Connection> findByInspectionTypeNameAndDeviceStatus(String inspectionType, Boolean status);

    List<Connection> findByInspectionTypeName(String inspectionType);
}