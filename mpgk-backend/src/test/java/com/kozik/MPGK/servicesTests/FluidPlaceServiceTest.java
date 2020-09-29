package com.kozik.MPGK.servicesTests;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.google.common.collect.Iterables;
import com.kozik.MPGK.entities.FluidPlace;
import com.kozik.MPGK.exceptions.fluidPlaceExceptions.FluidPlaceAlreadyExistException;
import com.kozik.MPGK.exceptions.fluidPlaceExceptions.FluidPlaceNotFoundException;
import com.kozik.MPGK.repositories.FluidPlaceRepository;
import com.kozik.MPGK.services.FluidPlaceService;

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
public class FluidPlaceServiceTest {

    @Mock
    FluidPlaceRepository fluidPlaceRepository;

    @InjectMocks
    FluidPlaceService fluidPlaceService;

    @Test
    public void shouldListAllTest() {

        // Given
        List<FluidPlace> fluidPlaces = Stream.of(new FluidPlace(1L, "first", null), new FluidPlace(2l, "second", null))
                .collect(Collectors.toList());
        given(fluidPlaceRepository.findAll()).willReturn(fluidPlaces);

        // When
        Integer size = Iterables.size(fluidPlaceService.listAll());

        // Then
        assertEquals(2, size);
    }

    @Test
    public void shouldSaveTest() {

        // Given
        FluidPlace fluidPlace = new FluidPlace("first", null);
        given(fluidPlaceRepository.save(fluidPlace)).willReturn(fluidPlace);

        // When
        FluidPlace newFluidPlace = fluidPlaceService.save(fluidPlace);

        // Then
        assertEquals(fluidPlace, newFluidPlace);
    }

    @Test(expected = FluidPlaceAlreadyExistException.class)
    public void shouldNotSaveTest() {

        // Given
        FluidPlace fluidPlace = new FluidPlace(1L, "first", null);

        // When
        try {
            fluidPlaceService.save(fluidPlace);
            Assert.fail("Expected an FluidPlaceAlreadyExistException to be thrown");
        } catch (FluidPlaceAlreadyExistException e) {
        }

        // Then
        fluidPlaceService.save(fluidPlace);
    }

    @Test
    public void shouldGetTest() {

        // Given
        Long placeId = 1L;
        Optional<FluidPlace> fluidPlace = Optional.of(new FluidPlace(placeId, "first", null));
        given(fluidPlaceRepository.findById(placeId)).willReturn(fluidPlace);

        // When
        FluidPlace getFluidPlace = fluidPlaceService.get(placeId);

        // Then
        verify(fluidPlaceRepository).findById(placeId);
        assertEquals(fluidPlace.get(), getFluidPlace);
    }

    @Test(expected = FluidPlaceNotFoundException.class)
    public void shouldNotGetTest() {

        // Given
        Long placeId = 1L;

        // When
        try {
            fluidPlaceService.get(placeId);
            Assert.fail("Expected an FluidPlaceNotFoundException to be thrown");
        } catch (FluidPlaceNotFoundException e) {
        }

        // Then
        fluidPlaceService.get(placeId);
    }

    @Test
    public void shouldDeleteTest() {

        // Given
        Long placeId = 1L;
        FluidPlace fluidPlace = new FluidPlace(placeId, "first", null);
        given(fluidPlaceRepository.findById(placeId)).willReturn(Optional.of(fluidPlace));

        // When
        fluidPlaceService.delete(placeId);

        // Then
        verify(fluidPlaceRepository).findById(placeId);
        verify(fluidPlaceRepository).delete(fluidPlace);
    }

    @Test(expected = FluidPlaceNotFoundException.class)
    public void shouldNotDeleteTest() {

        // Given
        Long placeId = 1L;

        // When
        try {
            fluidPlaceService.delete(placeId);
            Assert.fail("Expected an FluidPlaceNotFoundException to be thrown");
        } catch (FluidPlaceNotFoundException e) {
        }

        // Then
        fluidPlaceService.delete(placeId);
    }

    @Test
    public void shouldIsFluidPlaceExist() {

        // Given
        Long placeId = 1L;
        given(fluidPlaceRepository.existsById(placeId)).willReturn(Boolean.TRUE);

        // When
        Boolean isExist = fluidPlaceService.isFluidPlaceExist(placeId);

        // Then
        assertTrue(isExist);
    }

    @Test
    public void shouldNotIsFluidPlaceExist() {

        // Given
        Long placeId = 1L;
        given(fluidPlaceRepository.existsById(placeId)).willReturn(Boolean.FALSE);

        // When
        Boolean isExist = fluidPlaceService.isFluidPlaceExist(placeId);

        // Then
        assertFalse(isExist);
    }

    @Test
    public void shouldUpdateTest() {

        // Given
        Long placeId = 1L;
        FluidPlace oldFluidPlace = new FluidPlace(placeId, "fluid place", null);
        FluidPlace newFluidPlace = new FluidPlace(placeId, "updated fluid place", null);
        given(fluidPlaceRepository.findById(placeId)).willReturn(Optional.of(oldFluidPlace));
        given(fluidPlaceRepository.save(oldFluidPlace)).willReturn(newFluidPlace);

        // When
        FluidPlace updatedFluidPlace = fluidPlaceService.update(placeId, oldFluidPlace);

        // Then
        verify(fluidPlaceRepository).findById(placeId);
        verify(fluidPlaceRepository).save(oldFluidPlace);
        assertEquals(newFluidPlace, updatedFluidPlace);
    }

    @Test(expected = FluidPlaceNotFoundException.class)
    public void shouldNotUpdateTest() {

        // Given
        Long placeId = 1L;
        FluidPlace oldFluidPlace = new FluidPlace(placeId, "fluid place", null);

        // When
        try {
            fluidPlaceService.update(placeId, oldFluidPlace);
            Assert.fail("Expected an FluidPlaceNotFoundException to be thrown");
        } catch (FluidPlaceNotFoundException e) {
        }

        // Then
        fluidPlaceService.update(placeId, oldFluidPlace);
    }
}
