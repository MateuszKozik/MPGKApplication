package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.repositories.OverviewRepository;
import com.kozik.MPGK.exceptions.overviewExceptions.OverviewAlreadyExistException;
import com.kozik.MPGK.exceptions.overviewExceptions.OverviewNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OverviewService {
    @Autowired
    private OverviewRepository overviewRepository;

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
            element.setDatetime(overview.getDatetime());
            return overviewRepository.save(element);
        }).orElseThrow(() -> new OverviewNotFoundException(overviewId));

        return newOverview;
    }
}