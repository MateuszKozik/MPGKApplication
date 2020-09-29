package com.kozik.MPGK.servicesTests;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.google.common.collect.Iterables;
import com.kozik.MPGK.entities.Fluid;
import com.kozik.MPGK.exceptions.fluidExceptions.FluidAlreadyExistException;
import com.kozik.MPGK.exceptions.fluidExceptions.FluidNotFoundException;
import com.kozik.MPGK.repositories.FluidRepository;
import com.kozik.MPGK.services.FluidService;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class FluidServiceTest {

    @Mock
    FluidRepository fluidRepository;

    @InjectMocks
    FluidService fluidService;

    @Test
    public void shouldListAllTest() {

        // Given
        List<Fluid> fluids = Stream.of(new Fluid(1L, "first", null), new Fluid(1L, "second", null))
                .collect(Collectors.toList());

        given(fluidRepository.findAll()).willReturn(fluids);

        // When
        Integer size = Iterables.size(fluidService.listAll());

        // Then
        assertEquals(2, size);
    }

    @Test
    public void shouldSaveTest() {

        // Given
        Fluid fluid = new Fluid("first", null);
        given(fluidRepository.save(fluid)).willReturn(fluid);

        // When
        Fluid newFluid = fluidService.save(fluid);

        // Then
        assertEquals(fluid, newFluid);
    }

    @Test(expected = FluidAlreadyExistException.class)
    public void shouldNotSaveTest() {

        // Given
        Fluid fluid = new Fluid(1L, "first", null);

        // When
        try {
            fluidService.save(fluid);
            Assert.fail("Expected an FluidAlreadyExistException to be thrown");
        } catch (FluidAlreadyExistException e) {
        }

        // Then
        fluidService.save(fluid);
    }

    @Test
    public void shouldGetTest() {

        // Given
        Long fluidId = 1L;
        Optional<Fluid> fluid = Optional.of(new Fluid(fluidId, "first", null));
        given(fluidRepository.findById(fluidId)).willReturn(fluid);

        // When
        Fluid getFluid = fluidService.get(fluidId);

        // Then
        verify(fluidRepository).findById(fluidId);
        assertEquals(fluid.get(), getFluid);
    }

    @Test(expected = FluidNotFoundException.class)
    public void shouldNotGetTest() {

        // Given
        Long fluidId = 1L;

        // When
        try {
            fluidService.get(fluidId);
            Assert.fail("Expected an FluidNotFoundException to be thrown");
        } catch (FluidNotFoundException e) {
        }

        // Then
        fluidService.get(fluidId);
    }

    @Test
    public void shouldDeleteTest() {

        // Given
        Long fluidId = 1L;
        Fluid fluid = new Fluid(fluidId, "first", null);
        given(fluidRepository.findById(fluidId)).willReturn(Optional.of(fluid));

        // When
        fluidService.delete(fluidId);

        // Then
        verify(fluidRepository).findById(fluidId);
        verify(fluidRepository).delete(fluid);
    }

    @Test(expected = FluidNotFoundException.class)
    public void shouldNotDeleteTest() {

        // Given
        Long fluidId = 1L;

        // When
        try {
            fluidService.delete(fluidId);
            Assert.fail("Expected an FluidNotFoundException to be thrown");
        } catch (FluidNotFoundException e) {
        }

        // Then
        fluidService.delete(fluidId);
    }

    @Test
    public void shouldIsFluidExist() {

        // Given
        Long fluidId = 1L;
        given(fluidRepository.existsById(fluidId)).willReturn(Boolean.TRUE);

        // When
        Boolean isExist = fluidService.isFluidExist(fluidId);

        // Then
        assertTrue(isExist);
    }

    @Test
    public void shouldNotIsFluidExist() {

        // Given
        Long fluidId = 1L;
        given(fluidRepository.existsById(fluidId)).willReturn(Boolean.FALSE);

        // When
        Boolean isExist = fluidService.isFluidExist(fluidId);

        // Then
        assertFalse(isExist);
    }

    @Test
    public void shouldUpdateTest() {

        // Given
        Long fluidId = 1L;
        Fluid oldFluid = new Fluid(fluidId, "fluid", null);
        Fluid newFluid = new Fluid(fluidId, "updated fluid", null);
        given(fluidRepository.findById(fluidId)).willReturn(Optional.of(oldFluid));
        given(fluidRepository.save(oldFluid)).willReturn(newFluid);

        // When
        Fluid updatedFluid = fluidService.update(fluidId, oldFluid);

        // Then
        verify(fluidRepository).findById(fluidId);
        verify(fluidRepository).save(oldFluid);
        assertEquals(newFluid, updatedFluid);
    }

    @Test(expected = FluidNotFoundException.class)
    public void shouldNotUpdateTest() {

        // Given
        Long fluidId = 1L;
        Fluid oldFluid = new Fluid(fluidId, "fluid", null);

        // When
        try {
            fluidService.update(fluidId, oldFluid);
            Assert.fail("Expected an FluidNotFoundException to be thrown");
        } catch (FluidNotFoundException e) {
        }

        // Then
        fluidService.update(fluidId, oldFluid);
    }
}
