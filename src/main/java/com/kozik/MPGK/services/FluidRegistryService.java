package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.FluidRegistry;
import com.kozik.MPGK.repositories.FluidRegistryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FluidRegistryService {

    @Autowired private FluidRegistryRepository fluidRegistryRepository;

    public List<FluidRegistry> listAll(){
        return fluidRegistryRepository.findAll();
    }

    public void save(FluidRegistry fluidRegistry){
        fluidRegistryRepository.save(fluidRegistry);
    }

    public FluidRegistry get(Long id){
        return fluidRegistryRepository.findById(id).get();
    }

    public void delete(Long id){
        fluidRegistryRepository.deleteById(id);
    }
}