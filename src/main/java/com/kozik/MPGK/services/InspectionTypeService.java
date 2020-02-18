package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.InspectionType;
import com.kozik.MPGK.repositories.InspectionTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InspectionTypeService {

    @Autowired private InspectionTypeRepository inspectionTypeRepository;

    public List<InspectionType> listAll(){
        return inspectionTypeRepository.findAll();
    }

    public void save(InspectionType inspectionType){
        inspectionTypeRepository.save(inspectionType);
    }

    public InspectionType get(Long id){
        return inspectionTypeRepository.findById(id).get();
    }

    public void delete(Long id){
        inspectionTypeRepository.deleteById(id);
    }
}