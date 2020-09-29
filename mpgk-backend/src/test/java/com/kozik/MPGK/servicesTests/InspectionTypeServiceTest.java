package com.kozik.MPGK.servicesTests;

import com.google.common.collect.Iterables;
import com.kozik.MPGK.entities.InspectionType;
import com.kozik.MPGK.exceptions.inspectionTypeExceptions.InspectionTypeAlreadyExistException;
import com.kozik.MPGK.exceptions.inspectionTypeExceptions.InspectionTypeNotFoundException;
import com.kozik.MPGK.repositories.InspectionTypeRepository;
import com.kozik.MPGK.services.InspectionTypeService;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class InspectionTypeServiceTest {

    @Mock
    InspectionTypeRepository inspectionTypeRepository;

    @InjectMocks
    InspectionTypeService inspectionTypeService;

    @Test
    public void shouldListAllTest() {

        // Given
        List<InspectionType> inspectionTypes = Stream
                .of(new InspectionType(1L, "first", null), new InspectionType(2L, "second", null))
                .collect(Collectors.toList());
        given(inspectionTypeRepository.findAll()).willReturn(inspectionTypes);

        // When
        Integer size = Iterables.size(inspectionTypeService.listAll());

        // Then
        assertEquals(2, size);
    }

    @Test
    public void shouldSaveTest() {

        // Given
        InspectionType inspectionType = new InspectionType("first", null);
        given(inspectionTypeRepository.save(inspectionType)).willReturn(inspectionType);

        // When
        InspectionType newInspectionType = inspectionTypeService.save(inspectionType);

        // Then
        assertEquals(inspectionType, newInspectionType);
    }

    @Test(expected = InspectionTypeAlreadyExistException.class)
    public void shouldNotSaveTest() {

        // Given
        InspectionType inspectionType = new InspectionType(1L, "first", null);

        // When
        try {
            inspectionTypeService.save(inspectionType);
            Assert.fail("Expected an InspectionTypeAlreadyExistException to be thrown");
        } catch (InspectionTypeAlreadyExistException e) {
        }

        // Then
        inspectionTypeService.save(inspectionType);
    }

    @Test
    public void shouldGetTest() {

        // Given
        Long typeId = 1L;
        Optional<InspectionType> inspectionType = Optional.of(new InspectionType(typeId, "first", null));
        given(inspectionTypeRepository.findById(typeId)).willReturn(inspectionType);

        // When
        InspectionType getInspectionType = inspectionTypeService.get(typeId);

        // Then
        verify(inspectionTypeRepository).findById(typeId);
        assertEquals(inspectionType.get(), getInspectionType);
    }

    @Test(expected = InspectionTypeNotFoundException.class)
    public void shouldNotGetTest() {

        // When
        try {
            inspectionTypeService.get(1L);
            Assert.fail("Expected an InspectionTypeNotFoundException to be thrown");
        } catch (InspectionTypeNotFoundException e) {
        }

        // Then
        inspectionTypeService.get(1L);
    }

    @Test
    public void shouldDeleteTest() {

        // Given
        Long typeId = 1L;
        InspectionType inspectionType = new InspectionType(typeId, "first", null);
        given(inspectionTypeRepository.findById(typeId)).willReturn(Optional.of(inspectionType));

        // When
        inspectionTypeService.delete(typeId);

        // Then
        verify(inspectionTypeRepository).findById(typeId);
        verify(inspectionTypeRepository).delete(inspectionType);
    }

    @Test(expected = InspectionTypeNotFoundException.class)
    public void shouldNotDeleteTest() {

        // Given
        Long typeId = 1L;

        // When
        try {
            inspectionTypeService.delete(1L);
            Assert.fail("Expected an InspectionTypeNotFoundException to be thrown");
        } catch (InspectionTypeNotFoundException e) {
        }

        // Then
        inspectionTypeService.delete(typeId);
    }

    @Test
    public void shouldIsInspectionTypeExistTest() {

        // Given
        Long typeId = 1L;
        given(inspectionTypeRepository.existsById(typeId)).willReturn(Boolean.TRUE);

        // When
        Boolean isExist = inspectionTypeService.isInspectionTypeExist(typeId);

        // Then
        assertTrue(isExist);
    }

    @Test
    public void shouldNotIsInspectionTypeExistTest() {

        // Given
        Long typeId = 1L;
        given(inspectionTypeRepository.existsById(typeId)).willReturn(Boolean.FALSE);

        // When
        Boolean isExist = inspectionTypeService.isInspectionTypeExist(typeId);

        // Then
        assertFalse(isExist);
    }

    @Test
    public void shouldUpdateTest() {

        // Given
        Long typeId = 1L;
        InspectionType oldInspectionType = new InspectionType(typeId, "first", null);
        InspectionType newInspectionType = new InspectionType(typeId, "second", null);
        given(inspectionTypeRepository.findById(typeId)).willReturn(Optional.of(oldInspectionType));
        given(inspectionTypeRepository.save(oldInspectionType)).willReturn(newInspectionType);

        // When
        InspectionType updatedInspectionType = inspectionTypeService.update(typeId, oldInspectionType);

        // Then
        verify(inspectionTypeRepository).findById(typeId);
        verify(inspectionTypeRepository).save(oldInspectionType);
        assertEquals(newInspectionType, updatedInspectionType);

    }

    @Test(expected = InspectionTypeNotFoundException.class)
    public void shouldNotUpdateTest() {

        // Given
        Long typeId = 1L;
        InspectionType oldInspectionType = new InspectionType(typeId, "first", null);

        // When
        try {
            inspectionTypeService.update(typeId, oldInspectionType);
            Assert.fail("Expected an InspectionTypeNotFoundException to be thrown");
        } catch (InspectionTypeNotFoundException e) {
        }

        // Then
        inspectionTypeService.update(typeId, oldInspectionType);
    }
    
}
