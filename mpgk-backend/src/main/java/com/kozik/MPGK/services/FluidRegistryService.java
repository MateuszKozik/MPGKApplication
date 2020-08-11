package com.kozik.MPGK.services;

import java.time.LocalDateTime;

import com.kozik.MPGK.entities.FluidRegistry;
import com.kozik.MPGK.exceptions.fluidRegistryExceptions.FluidRegistryAlreadyExistException;
import com.kozik.MPGK.exceptions.fluidRegistryExceptions.FluidRegistryNotFoundException;
import com.kozik.MPGK.repositories.FluidRegistryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FluidRegistryService {

    @Autowired
    private FluidRegistryRepository fluidRegistryRepository;

    public Iterable<FluidRegistry> listAll() {
        return fluidRegistryRepository.findAll();
    }

    public FluidRegistry save(FluidRegistry fluidRegistry) {
        if (fluidRegistry.getRegistryId() != null) {
            throw new FluidRegistryAlreadyExistException(fluidRegistry.getRegistryId());
        }
         fluidRegistry.setDatetime(LocalDateTime.now().toString());
        return fluidRegistryRepository.save(fluidRegistry);
    }

    public FluidRegistry get(Long registryId) {
        FluidRegistry fluidRegistry = fluidRegistryRepository.findById(registryId)
                .orElseThrow(() -> new FluidRegistryNotFoundException(registryId));
        return fluidRegistry;
    }

    public void delete(Long registryId) {
        fluidRegistryRepository.delete(get(registryId));
    }

    public Boolean isFluidRegistryExist(Long registryId) {
        return fluidRegistryRepository.existsById(registryId);
    }

    public FluidRegistry update(Long registryId, FluidRegistry fluidRegistry) {
        FluidRegistry newFluidRegistry = fluidRegistryRepository.findById(registryId).map(element -> {
            element.setQuantity(fluidRegistry.getQuantity());
            element.setDatetime(fluidRegistry.getDatetime());
            return fluidRegistryRepository.save(element);
        }).orElseThrow(() -> new FluidRegistryNotFoundException(registryId));

        return newFluidRegistry;
    }
}