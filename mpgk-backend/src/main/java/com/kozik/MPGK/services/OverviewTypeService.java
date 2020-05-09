package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.OverviewType;
import com.kozik.MPGK.exceptions.overviewTypeExceptions.OverviewTypeAlreadyExistException;
import com.kozik.MPGK.exceptions.overviewTypeExceptions.OverviewTypeNotFoundException;
import com.kozik.MPGK.repositories.OverviewTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OverviewTypeService {

    @Autowired
    private OverviewTypeRepository overviewTypeRepository;

    public Iterable<OverviewType> listAll() {
        return overviewTypeRepository.findAll();
    }

    public OverviewType save(OverviewType overviewType) {
        if (overviewType.getTypeId() != null) {
            throw new OverviewTypeAlreadyExistException(overviewType.getTypeId());
        }
        return overviewTypeRepository.save(overviewType);
    }

    public OverviewType get(Long typeId) {
        OverviewType overviewType = overviewTypeRepository.findById(typeId)
                .orElseThrow(() -> new OverviewTypeNotFoundException(typeId));
        return overviewType;
    }

    public void delete(Long typeId) {
        overviewTypeRepository.delete(get(typeId));
    }

    public Boolean isOverviewTypeExist(Long id) {
        return overviewTypeRepository.existsById(id);
    }

    public OverviewType update(Long typeId, OverviewType overviewType) {
        OverviewType newOverviewType = overviewTypeRepository.findById(typeId).map(element -> {
            element.setName(overviewType.getName());
            return overviewTypeRepository.save(element);
        }).orElseThrow(() -> new OverviewTypeNotFoundException(typeId));

        return newOverviewType;
    }
}