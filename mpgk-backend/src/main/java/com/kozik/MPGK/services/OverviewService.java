package com.kozik.MPGK.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.repositories.ActivityGroupRepository;
import com.kozik.MPGK.repositories.OverviewRepository;
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

    public ArrayList<OverviewObject> getOverviewsByConnection(Long connectionId) {
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
}