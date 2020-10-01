package com.kozik.MPGK.servicesTests;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.google.common.collect.Iterables;
import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.exceptions.activityGroupExceptions.ActivityGroupAlreadyExistException;
import com.kozik.MPGK.exceptions.activityGroupExceptions.ActivityGroupNotFoundException;
import com.kozik.MPGK.repositories.ActivityGroupRepository;
import com.kozik.MPGK.services.ActivityGroupService;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ActivityGroupServiceTest {

    @Mock
    ActivityGroupRepository activityGroupRepository;

    @InjectMocks
    ActivityGroupService activityGroupService;

    @Test
    public void shouldListAllTest() {

        // Given
        List<ActivityGroup> activitiesGroups = Stream
                .of(new ActivityGroup(1L, "first", null, null), new ActivityGroup(2L, "second", null, null))
                .collect(Collectors.toList());
        given(activityGroupRepository.findAll()).willReturn(activitiesGroups);

        // When
        Integer size = Iterables.size(activityGroupService.listAll());

        // Then
        assertEquals(2, size);
    }

    @Test
    public void shouldSaveTest() {

        // Given
        ActivityGroup activityGroup = new ActivityGroup("first", null, null);
        given(activityGroupRepository.save(activityGroup)).willReturn(activityGroup);

        // When
        ActivityGroup newActivityGroup = activityGroupService.save(activityGroup);

        // Then
        assertEquals(activityGroup, newActivityGroup);
    }

    @Test(expected = ActivityGroupAlreadyExistException.class)
    public void shouldNotSaveTest() {

        // Given
        ActivityGroup activityGroup = new ActivityGroup(1L, "first", null, null);

        // When
        try {
            activityGroupService.save(activityGroup);
            Assert.fail("Expected an ActivityGroupAlreadyExistException to be thrown");
        } catch (ActivityGroupAlreadyExistException e) {
        }

        // Then
        activityGroupService.save(activityGroup);
    }

    @Test
    public void shouldGetTest() {

        // Given
        Long groupId = 1L;
        Optional<ActivityGroup> group = Optional.of(new ActivityGroup(groupId, "first", null, null));
        given(activityGroupRepository.findById(groupId)).willReturn(group);

        // When
        ActivityGroup getActivityGroup = activityGroupService.get(groupId);

        // Then
        verify(activityGroupRepository).findById(groupId);
        assertEquals(group.get(), getActivityGroup);
    }

    @Test(expected = ActivityGroupNotFoundException.class)
    public void shouldNotGetTest() {

        // Given
        Long groupId = 1L;

        // When
        try {
            activityGroupService.get(groupId);
            Assert.fail("Expected an ActivityGroupNotFoundException to be thrown");
        } catch (ActivityGroupNotFoundException e) {
        }

        // Then
        activityGroupService.get(groupId);
    }

    @Test
    public void shouldDeleteTest() {

        // Given
        Long groupId = 1L;
        ActivityGroup activityGroup = new ActivityGroup(groupId, "first", null, null);
        Optional<ActivityGroup> optionalGroup = Optional.of(activityGroup);
        given(activityGroupRepository.findById(groupId)).willReturn(optionalGroup);

        // When
        activityGroupService.delete(groupId);

        // Then
        verify(activityGroupRepository).findById(groupId);
        verify(activityGroupRepository).delete(activityGroup);
    }

    @Test(expected = ActivityGroupNotFoundException.class)
    public void shouldNotDeleteTest() {

        // Given
        Long groupId = 1L;

        // When
        try {
            activityGroupService.delete(groupId);
            Assert.fail("Expected an ActivityGroupNotFoundException to be thrown");
        } catch (ActivityGroupNotFoundException e) {
        }

        // Then
        activityGroupService.delete(groupId);
    }

    @Test
    public void shouldIsActivityGroupExistTest() {

        // Given
        Long groupId = 1L;
        given(activityGroupRepository.existsById(groupId)).willReturn(Boolean.TRUE);

        // When
        Boolean isExist = activityGroupService.isActivityGroupExist(groupId);

        // Then
        assertTrue(isExist);
    }

    @Test
    public void shouldNotIsActivityGroupExistTest() {

        // Given
        Long groupId = 1L;
        given(activityGroupRepository.existsById(groupId)).willReturn(Boolean.FALSE);

        // When
        Boolean isExist = activityGroupService.isActivityGroupExist(groupId);

        // Then
        assertFalse(isExist);
    }

    @Test
    public void shouldUpdateTest() {

        // Given
        Long groupId = 1L;
        ActivityGroup oldActivityGroup = new ActivityGroup(groupId, "first", null, null);
        ActivityGroup newActivityGroup = new ActivityGroup(groupId, "second", null, null);
        given(activityGroupRepository.findById(groupId)).willReturn(Optional.of(oldActivityGroup));
        given(activityGroupRepository.save(oldActivityGroup)).willReturn(oldActivityGroup);

        // When
        ActivityGroup updatedActivityGroup = activityGroupService.update(groupId, newActivityGroup);

        // Then
        verify(activityGroupRepository).findById(groupId);
        verify(activityGroupRepository).save(oldActivityGroup);
        assertEquals(newActivityGroup, updatedActivityGroup);
    }

    @Test(expected = ActivityGroupNotFoundException.class)
    public void shouldNotUpdateTest() {

        // Given
        Long groupId = 1L;
        ActivityGroup oldActivityGroup = new ActivityGroup(groupId, "first", null, null);

        // When
        try {
            activityGroupService.update(groupId, oldActivityGroup);
            Assert.fail("Expected an ActivityGroupNotFoundException to be thrown");
        } catch (ActivityGroupNotFoundException e) {
        }

        // Then
        activityGroupService.update(groupId, oldActivityGroup);
    }
}
