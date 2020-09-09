package com.kozik.MPGK.services;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    @Autowired
    private PersonService personService;

    public Iterable<FluidRegistry> listAll() {
        return fluidRegistryRepository.findAll();
    }

    public FluidRegistry save(FluidRegistry fluidRegistry, Principal principal) {
        String username = principal.getName();
        if (fluidRegistry.getRegistryId() != null) {
            throw new FluidRegistryAlreadyExistException(fluidRegistry.getRegistryId());
        }
        fluidRegistry.setDatetime(LocalDateTime.now().toLocalDate().toString() + "T"
                + LocalDateTime.now().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")));
        fluidRegistry.setPerson(personService.getByUsername(username));
        return fluidRegistryRepository.save(fluidRegistry);
    }

    public FluidRegistry get(Long registryId) {
        return fluidRegistryRepository.findById(registryId)
                .orElseThrow(() -> new FluidRegistryNotFoundException(registryId));
    }

    public void delete(Long registryId) {
        fluidRegistryRepository.delete(get(registryId));
    }

    public Boolean isFluidRegistryExist(Long registryId) {
        return fluidRegistryRepository.existsById(registryId);
    }

    public FluidRegistry update(Long registryId, FluidRegistry fluidRegistry) {
        return fluidRegistryRepository.findById(registryId).map(element -> {
            element.setQuantity(fluidRegistry.getQuantity());
            element.setDatetime(fluidRegistry.getDatetime());
            element.setPerson(fluidRegistry.getPerson());
            element.setFluid(fluidRegistry.getFluid());
            element.setFluidPlace(fluidRegistry.getFluidPlace());
            return fluidRegistryRepository.save(element);
        }).orElseThrow(() -> new FluidRegistryNotFoundException(registryId));
    }
}