package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.Fluid;
import com.kozik.MPGK.repositories.FluidRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FluidService {
    @Autowired private FluidRepository fluidRepository;

    public List<Fluid> listAll(){
        return fluidRepository.findAll();
    }

    public void save(Fluid fluid){
        fluidRepository.save(fluid);
    }

    public Fluid get(Long id){
        return fluidRepository.findById(id).get();
    }

    public void delete(Long id){
        fluidRepository.deleteById(id);
    }

    public Boolean isFluidExist(Long id){
        return fluidRepository.existsById(id);
    }

    public Fluid update(Long id, Fluid fluid){
        Fluid currentFluid = get(id);
        currentFluid.setName(fluid.getName());
        save(currentFluid);
        return currentFluid;
    }
}