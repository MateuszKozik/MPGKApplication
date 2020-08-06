package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.FluidPlace;
import com.kozik.MPGK.exceptions.fluidPlaceExceptions.FluidPlaceAlreadyExistException;
import com.kozik.MPGK.exceptions.fluidPlaceExceptions.FluidPlaceNotFoundException;
import com.kozik.MPGK.repositories.FluidPlaceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FluidPlaceService {

    @Autowired
    private FluidPlaceRepository fluidPlaceRepository;

    public Iterable<FluidPlace> listAll() {
        return fluidPlaceRepository.findAll();
    }

    public FluidPlace save(FluidPlace fluidPlace) {
        if (fluidPlace.getPlaceId() != null) {
            throw new FluidPlaceAlreadyExistException(fluidPlace.getPlaceId());
        }
        return fluidPlaceRepository.save(fluidPlace);
    }

    public FluidPlace get(Long placeId) {
        FluidPlace fluidPlace = fluidPlaceRepository.findById(placeId)
                .orElseThrow(() -> new FluidPlaceNotFoundException(placeId));
        return fluidPlace;
    }

    public void delete(Long placeId) {
        fluidPlaceRepository.delete(get(placeId));
    }

    public Boolean isFluidPlaceExist(Long placeId) {
        return fluidPlaceRepository.existsById(placeId);
    }

    public FluidPlace update(Long placeId, FluidPlace fluidPlace) {
        FluidPlace newFluidPlace = fluidPlaceRepository.findById(placeId).map(element -> {
            element.setName(fluidPlace.getName());
            return fluidPlaceRepository.save(element);
        }).orElseThrow(() -> new FluidPlaceNotFoundException(placeId));

        return newFluidPlace;
    }
}