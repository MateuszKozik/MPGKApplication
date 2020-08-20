package com.kozik.MPGK.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.repositories.ActivityGroupRepository;
import com.kozik.MPGK.repositories.OverviewRepository;
import com.kozik.MPGK.utilities.ConnectionObject;
import com.kozik.MPGK.utilities.OverviewObject;

import com.kozik.MPGK.exceptions.overviewExceptions.OverviewAlreadyExistException;
import com.kozik.MPGK.exceptions.overviewExceptions.OverviewNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OverviewService {
    @Autowired
    private OverviewRepository overviewRepository;

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private ActivityGroupRepository activityGroupRepository;

    public Iterable<Overview> listAll() {
        return overviewRepository.findAll();
    }

    public Overview save(Overview overview) {
        if (overview.getOverviewId() != null) {
            throw new OverviewAlreadyExistException(overview.getOverviewId());
        }
        return overviewRepository.save(overview);
    }

    public Overview get(Long overviewId) {
        Overview overview = overviewRepository.findById(overviewId)
                .orElseThrow(() -> new OverviewNotFoundException(overviewId));
        return overview;
    }

    public void delete(Long overviewId) {
        overviewRepository.delete(get(overviewId));
    }

    public Boolean isOverviewExist(Long id) {
        return overviewRepository.existsById(id);
    }

    public Overview update(Long overviewId, Overview overview) {
        Overview newOverview = overviewRepository.findById(overviewId).map(element -> {
            element.setStatus(overview.getStatus());
            element.setStartTime(overview.getStartTime());
            element.setEndTime(overview.getEndTime());
            element.setParameter(overview.getParameter());
            element.setComment(overview.getComment());
            element.setDatetime(LocalDateTime.now().toString());
            element.setActivity(overview.getActivity());
            element.setPerson(overview.getPerson());
            element.setSupervisor(overview.getSupervisor());
            return overviewRepository.save(element);
        }).orElseThrow(() -> new OverviewNotFoundException(overviewId));

        return newOverview;
    }

    public ArrayList<OverviewObject> getOverviewByConnection(Long connectionId) {
        Connection connection = connectionService.get(connectionId);
        List<ActivityGroup> groups = activityGroupRepository.findByConnection(connection);

        ArrayList<OverviewObject> overviewList = new ArrayList<>();

        for (ActivityGroup activityGroup : groups) {
            LocalDateTime now = LocalDateTime.now();
            List<Overview> overviews = overviewRepository
                    .findByActivityActivityGroupAndEndTimeGreaterThan(activityGroup, now);

            OverviewObject overviewObject = new OverviewObject();
            overviewObject.setActivityGroup(activityGroup);
            overviewObject.setOverviews(overviews);
            overviewList.add(overviewObject);
        }

        return overviewList;
    }

    public List<Overview> getActionsByName(String name, String parameter) {
        List<Overview> overviews = overviewRepository.findByActivityNameAndParameter(name, parameter);

        return overviews;
    }

    public void deleteAll() {
        overviewRepository.deleteAll();
    }

    public void setOverviewParameter(String activityName, String parameter, String comment) {
        Overview overview = overviewRepository.findFirstByActivityNameOrderByEndTimeDesc(activityName);
        overview.setParameter(parameter);
        overview.setComment(comment);
        overview.setStatus("Wykonany");
        update(overview.getOverviewId(), overview);
    }

    public ArrayList<ConnectionObject> getOverviewsListByConnection(Long connectionId) {
        ArrayList<ConnectionObject> connectionObjects = new ArrayList<>();

        Connection connection = connectionService.get(connectionId);
        Overview actualOverview = overviewRepository
                .findFirstByActivityActivityGroupConnectionAndEndTimeGreaterThan(connection, LocalDateTime.now());
        if (actualOverview != null) {
            ConnectionObject connectionObject = new ConnectionObject();
            Integer count = overviewRepository.countByActivityActivityGroupConnectionAndStatus(connection, "Nowy");
            if (count == 0) {
                connectionObject.setOverviewStatus("Wykonany");
            } else {
                connectionObject.setOverviewStatus("W trakcie");
            }

            connectionObject.setConnection(connection);
            connectionObject.setEndTime(actualOverview.getEndTime());
            connectionObject.setOverdue(false);
            connectionObjects.add(connectionObject);
        }

        List<Overview> overdueOverviews = overviewRepository.findByActivityActivityGroupConnectionAndStatus(connection,
                "Zaległy");

        List<String> times = new ArrayList<>();

        for (Overview overview : overdueOverviews) {
            if (!times.contains(overview.getEndTime())) {
                times.add(overview.getEndTime());
            }
        }

        // Sort array of date
        times.sort(Comparator.naturalOrder());
        for (String time : times) {
            ConnectionObject connectionObject = new ConnectionObject();
            connectionObject.setConnection(connection);
            connectionObject.setEndTime(time);
            connectionObject.setOverdue(true);
            connectionObjects.add(connectionObject);
        }

        return connectionObjects;
    }

    public ArrayList<OverviewObject> getOverdueOverviewByConnection(Long connectionId, String endTime) {
        Connection connection = connectionService.get(connectionId);
        List<ActivityGroup> groups = activityGroupRepository.findByConnection(connection);

        ArrayList<OverviewObject> overviewList = new ArrayList<>();

        for (ActivityGroup activityGroup : groups) {
            List<Overview> overviews = overviewRepository.findByActivityActivityGroupAndEndTime(activityGroup,
                    LocalDateTime.parse(endTime));

            OverviewObject overviewObject = new OverviewObject();
            overviewObject.setActivityGroup(activityGroup);
            overviewObject.setOverviews(overviews);
            overviewList.add(overviewObject);
        }

        return overviewList;
    }
}