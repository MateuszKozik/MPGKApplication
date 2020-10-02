package com.kozik.MPGK.servicesTests;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.google.common.collect.Iterables;
import com.kozik.MPGK.entities.FluidRegistry;
import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.exceptions.fluidRegistryExceptions.FluidRegistryAlreadyExistException;
import com.kozik.MPGK.exceptions.fluidRegistryExceptions.FluidRegistryNotFoundException;
import com.kozik.MPGK.repositories.FluidRegistryRepository;
import com.kozik.MPGK.services.FluidRegistryService;
import com.kozik.MPGK.services.PersonService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class FluidRegistryServiceTest {

    @Mock
    FluidRegistryRepository fluidRegistryRepository;

    @Mock
    PersonService personService;

    @InjectMocks
    FluidRegistryService fluidRegistryService;

    @Test
    public void shouldListAllTest() {

        // Given
        List<FluidRegistry> fluidRegistries = Stream
                .of(new FluidRegistry(1L, 10L, LocalDateTime.now(), null, null, null),
                        new FluidRegistry(2L, 20L, LocalDateTime.now(), null, null, null))
                .collect(Collectors.toList());
        given(fluidRegistryRepository.findAllByOrderByDatetimeDesc()).willReturn(fluidRegistries);

        // When
        Integer size = Iterables.size(fluidRegistryService.listAll());

        // Then
        assertEquals(2, size);
    }

    @Test
    public void shouldGetTest() {

        // Given
        Long registryId = 1L;
        Optional<FluidRegistry> fluidRegistry = Optional
                .of(new FluidRegistry(registryId, 10L, LocalDateTime.now(), null, null, null));
        given(fluidRegistryRepository.findById(registryId)).willReturn(fluidRegistry);

        // When
        FluidRegistry getFluidRegistry = fluidRegistryService.get(registryId);

        // Then
        verify(fluidRegistryRepository).findById(registryId);
        assertEquals(fluidRegistry.get(), getFluidRegistry);
    }

    @Test(expected = FluidRegistryNotFoundException.class)
    public void shouldNotGetTest() {

        // Given
        Long registryId = 1L;

        // When
        try {
            fluidRegistryService.get(registryId);
            fail("Expected an FluidRegistryNotFoundException to be thrown");
        } catch (FluidRegistryNotFoundException e) {
        }

        fluidRegistryService.get(registryId);
    }

    @Test
    public void shouldDeleteTest() {

        // Given
        Long registryId = 1L;
        FluidRegistry fluidRegistry = new FluidRegistry(registryId, 10L, LocalDateTime.now(), null, null, null);
        given(fluidRegistryRepository.findById(registryId)).willReturn(Optional.of(fluidRegistry));

        // When
        fluidRegistryService.delete(registryId);

        // Then
        verify(fluidRegistryRepository).findById(registryId);
        verify(fluidRegistryRepository).delete(fluidRegistry);
    }

    @Test(expected = FluidRegistryNotFoundException.class)
    public void shouldNotDeleteTest() {

        // Given
        Long registryId = 1L;

        // When
        try {
            fluidRegistryService.delete(registryId);
            fail("Expected an FluidRegistryNotFoundException to be thrown");
        } catch (FluidRegistryNotFoundException e) {
        }

        // Then
        fluidRegistryService.delete(registryId);
    }

    @Test
    public void shouldIsFluidRegistryExistTest() {

        // Given
        Long registryId = 1L;
        given(fluidRegistryRepository.existsById(registryId)).willReturn(Boolean.TRUE);

        // When
        Boolean isExist = fluidRegistryService.isFluidRegistryExist(registryId);

        // Then
        assertTrue(isExist);
    }

    @Test
    public void shouldNotIsFluidRegistryExistTest() {

        // Given
        Long registryId = 1L;
        given(fluidRegistryRepository.existsById(registryId)).willReturn(Boolean.FALSE);

        // When
        Boolean isExist = fluidRegistryService.isFluidRegistryExist(registryId);

        // Then
        assertFalse(isExist);
    }

    @Test
    public void shouldUpdateTest() {

        // Given
        Long registryId = 1L;
        FluidRegistry oldFluidRegistry = new FluidRegistry(registryId, 10L, LocalDateTime.now(), null, null, null);
        FluidRegistry newFluidRegistry = new FluidRegistry(registryId, 11L, LocalDateTime.now(), null, null, null);
        given(fluidRegistryRepository.findById(registryId)).willReturn(Optional.of(oldFluidRegistry));
        given(fluidRegistryRepository.save(oldFluidRegistry)).willReturn(oldFluidRegistry);

        // When
        FluidRegistry updatedFluidRegistry = fluidRegistryService.update(registryId, newFluidRegistry);

        // Then
        verify(fluidRegistryRepository).findById(registryId);
        verify(fluidRegistryRepository).save(oldFluidRegistry);
        assertEquals(oldFluidRegistry, updatedFluidRegistry);
    }

    @Test(expected = FluidRegistryNotFoundException.class)
    public void shouldNotUpdateTest() {

        // Given
        Long registryId = 1L;
        FluidRegistry oldFluidRegistry = new FluidRegistry(registryId, 10L, LocalDateTime.now(), null, null, null);

        // When
        try {
            fluidRegistryService.update(registryId, oldFluidRegistry);
            fail("Expected an FluidRegistryNotFoundException to be thrown");
        } catch (FluidRegistryNotFoundException e) {
        }

        // Then
        fluidRegistryService.update(registryId, oldFluidRegistry);
    }
}
