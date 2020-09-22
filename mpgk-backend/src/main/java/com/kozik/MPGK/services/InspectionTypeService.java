package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.InspectionType;
import com.kozik.MPGK.exceptions.inspectionTypeExceptions.InspectionTypeAlreadyExistException;
import com.kozik.MPGK.exceptions.inspectionTypeExceptions.InspectionTypeNotFoundException;
import com.kozik.MPGK.repositories.InspectionTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InspectionTypeService {

    @Autowired
    private InspectionTypeRepository inspectionTypeRepository;

    public Iterable<InspectionType> listAll() {
        return inspectionTypeRepository.findAll();
    }

    public InspectionType save(InspectionType inspectionType) {
        if (inspectionType.getTypeId() != null) {
            throw new InspectionTypeAlreadyExistException(inspectionType.getTypeId());
        }
        return inspectionTypeRepository.save(inspectionType);
    }

    public InspectionType get(Long typeId) {
        return inspectionTypeRepository.findById(typeId).orElseThrow(() -> new InspectionTypeNotFoundException(typeId));
    }

    public void delete(Long typeId) {
        inspectionTypeRepository.delete(get(typeId));
    }

    public Boolean isInspectionTypeExist(Long id) {
        return inspectionTypeRepository.existsById(id);
    }

    public InspectionType update(Long typeId, InspectionType inspectionType) {
        return inspectionTypeRepository.findById(typeId).map(element -> {
            element.setName(inspectionType.getName());
            return inspectionTypeRepository.save(element);
        }).orElseThrow(() -> new InspectionTypeNotFoundException(typeId));
    }
}