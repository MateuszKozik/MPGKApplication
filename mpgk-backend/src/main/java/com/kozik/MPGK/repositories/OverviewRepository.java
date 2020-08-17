package com.kozik.MPGK.repositories;

import java.time.LocalDateTime;
import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Overview;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OverviewRepository extends JpaRepository<Overview, Long> {

    List<Overview> findByActivityActivityGroupAndEndTimeGreaterThan(ActivityGroup activityGroup, LocalDateTime endTime);

    List<Overview> findByActivityNameAndParameter(String name, String parameter);

    Integer countByActivityActivityGroupConnectionAndStatus(Connection connection, String status);

    Overview findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(Connection connection);

    List<Overview> findByActivityActivityGroupAndEndTimeLessThanAndStatus(ActivityGroup activityGroup,
            LocalDateTime endTime, String status);
}