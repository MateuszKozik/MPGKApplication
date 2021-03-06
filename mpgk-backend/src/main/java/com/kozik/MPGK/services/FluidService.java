package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.Fluid;
import com.kozik.MPGK.exceptions.fluidExceptions.FluidAlreadyExistException;
import com.kozik.MPGK.exceptions.fluidExceptions.FluidNotFoundException;
import com.kozik.MPGK.repositories.FluidRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FluidService {

    @Autowired
    private FluidRepository fluidRepository;

    public Iterable<Fluid> listAll() {
        return fluidRepository.findAll();
    }

    public Fluid save(Fluid fluid) {
        if (fluid.getFluidId() != null) {
            throw new FluidAlreadyExistException(fluid.getFluidId());
        }
        return fluidRepository.save(fluid);
    }

    public Fluid get(Long fluidId) {
        return fluidRepository.findById(fluidId).orElseThrow(() -> new FluidNotFoundException(fluidId));
    }

    public void delete(Long fluidId) {
        fluidRepository.delete(get(fluidId));
    }

    public Boolean isFluidExist(Long id) {
        return fluidRepository.existsById(id);
    }

    public Fluid update(Long fluidId, Fluid fluid) {
        return fluidRepository.findById(fluidId).map(element -> {
            element.setName(fluid.getName());
            return fluidRepository.save(element);
        }).orElseThrow(() -> new FluidNotFoundException(fluidId));
    }
}