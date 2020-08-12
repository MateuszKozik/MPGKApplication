package com.kozik.MPGK.repositories;

import java.time.LocalDateTime;
import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Overview;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OverviewRepository extends JpaRepository<Overview, Long> {

    List<Overview> findByActivityActivityGroupAndEndTimeGreaterThan(ActivityGroup activityGroup, LocalDateTime endTime);
    List<Overview> findByActivityNameAndParameter(String name, String parameter);
}