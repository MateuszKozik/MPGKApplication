package com.kozik.MPGK.services;

import java.util.ArrayList;
import java.util.List;

import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.repositories.ConnectionRepository;
import com.kozik.MPGK.repositories.OverviewRepository;
import com.kozik.MPGK.utilities.OverviewObject;
import com.kozik.MPGK.utilities.PeriodicConnectionObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomePageService {

    @Autowired
    private ConnectionRepository connectionRepository;

    @Autowired
    private OverviewRepository overviewRepository;

    @Autowired
    private OverviewService overviewService;

    public ArrayList<PeriodicConnectionObject> getPeriodic() {
        List<Connection> connections = connectionRepository.findByOverviewTypeNameNotLikeAndDeviceStatus("Na żądanie",
                true);

        ArrayList<PeriodicConnectionObject> periodicOverwiews = new ArrayList<>();

        for (Connection connection : connections) {
            PeriodicConnectionObject object = new PeriodicConnectionObject();
            object.setConnection(connection);
            Integer count = overviewRepository.countByActivityActivityGroupConnectionAndStatus(connection, "Nowy");
            if (count == 0) {
                object.setStatus("Wykonany");
            } else {
                object.setStatus("W trakcie");
            }
            object.setOverdudeCount(
                    overviewRepository.countByActivityActivityGroupConnectionAndStatus(connection, "Zaległy"));

            ArrayList<OverviewObject> listOverviewsObject = overviewService
                    .getOverviewsByConnection(connection.getConnectionId());

            List<Overview> overviews = new ArrayList<>();

            if (!listOverviewsObject.isEmpty()) {
                overviews = listOverviewsObject.get(0).getOverviews();
            }

            if (!overviews.isEmpty()) {
                object.setStartTime(overviews.get(0).getStartTime());
                object.setEndTime(overviews.get(0).getEndTime());
            }
            periodicOverwiews.add(object);
        }
        return periodicOverwiews;
    }
}