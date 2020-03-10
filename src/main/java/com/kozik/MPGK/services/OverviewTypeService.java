package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.OverviewType;
import com.kozik.MPGK.repositories.OverviewTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OverviewTypeService {

    @Autowired private OverviewTypeRepository overviewTypeRepository;

    public List<OverviewType> listAll(){
        return overviewTypeRepository.findAll();
    }

    public void save(OverviewType inspectionType){
        overviewTypeRepository.save(inspectionType);
    }

    public OverviewType get(Long id){
        return overviewTypeRepository.findById(id).get();
    }

    public void delete(Long id){
        overviewTypeRepository.deleteById(id);
    }

    public Boolean isOverviewTypeExist(Long id){
        return overviewTypeRepository.existsById(id);
    }

    public OverviewType update(Long id, OverviewType overviewType){
        OverviewType currentOverviewType = get(id);
        currentOverviewType.setName(overviewType.getName());
        save(currentOverviewType);
        return currentOverviewType;
    }
}