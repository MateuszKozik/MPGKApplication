package com.kozik.MPGK.repositories;

import java.time.LocalDateTime;
import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Inspection;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InspectionRepository extends JpaRepository<Inspection, Long> {

        List<Inspection> findByActivityActivityGroupAndEndTimeGreaterThan(ActivityGroup activityGroup,
                        LocalDateTime endTime);

        Inspection findFirstByActivityActivityGroupConnectionAndEndTimeGreaterThan(Connection connection,
                        LocalDateTime endTime);

        List<Inspection> findByActivityNameAndParameter(String name, String parameter);

        Integer countByActivityActivityGroupConnectionAndStatus(Connection connection, String status);

        Inspection findFirstByActivityActivityGroupConnectionOrderByEndTimeDesc(Connection connection);

        List<Inspection> findByActivityActivityGroupAndEndTimeLessThanAndStatus(ActivityGroup activityGroup,
                        LocalDateTime endTime, String status);

        Inspection findFirstByActivityNameOrderByEndTimeDesc(String name);

        List<Inspection> findByActivityActivityGroupConnectionAndStatus(Connection connection, String status);

        List<Inspection> findByActivityActivityGroupAndEndTime(ActivityGroup activityGroup, LocalDateTime endTime);
}