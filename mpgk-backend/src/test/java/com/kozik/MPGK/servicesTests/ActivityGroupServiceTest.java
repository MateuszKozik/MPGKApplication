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
import static org.mockito.Mockito.times;
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
        given(activityGroupRepository.findAll()).willReturn(prepareMockData());

        assertEquals(2, Iterables.size(activityGroupService.listAll()));
    }

    @Test
    public void shouldSaveTest() {
        ActivityGroup activityGroup = new ActivityGroup("first", null, null);
        given(activityGroupRepository.save(activityGroup)).willReturn(activityGroup);
        assertEquals(activityGroup, activityGroupService.save(activityGroup));
    }

    @Test(expected = ActivityGroupAlreadyExistException.class)
    public void shouldNotSaveTest() {
        ActivityGroup activityGroup = new ActivityGroup(1L, "first", null, null);

        try {
            activityGroupService.save(activityGroup);
            Assert.fail("Expected an ActivityGroupAlreadyExistException to be thrown");
        } catch (ActivityGroupAlreadyExistException e) {
        }
        activityGroupService.save(activityGroup);
    }

    @Test
    public void shouldGetTest() {
        Optional<ActivityGroup> group = Optional.of(new ActivityGroup(1L, "first", null, null));
        given(activityGroupRepository.findById(1L)).willReturn(group);
        assertEquals(group.get(), activityGroupService.get(1L));
    }

    @Test(expected = ActivityGroupNotFoundException.class)
    public void shouldNotGetTest() {
        try {
            activityGroupService.get(1L);
            Assert.fail("Expected an ActivityGroupNotFoundExpection to be thrown");
        } catch (ActivityGroupNotFoundException e) {
        }

        activityGroupService.get(1L);
    }

    @Test
    public void shouldDeleteTest() {
        Long groupId = 1L;
        ActivityGroup activityGroup = new ActivityGroup(1L, "first", null, null);
        Optional<ActivityGroup> optionalGroup = Optional.of(activityGroup);
        given(activityGroupRepository.findById(groupId)).willReturn(optionalGroup);
        activityGroupService.delete(groupId);
        verify(activityGroupRepository, times(1)).delete(activityGroup);
    }

    @Test(expected = ActivityGroupNotFoundException.class)
    public void shouldNotDeleteTest() {
        Long groupId = 1L;
        try {
            activityGroupService.delete(groupId);
            Assert.fail("Expected an ActivityGroupNotFountExpection to be thrown");
        } catch (ActivityGroupNotFoundException e) {
        }
        activityGroupService.delete(groupId);
    }

    @Test
    public void shouldIsActivityGroupExistTest() {
        given(activityGroupRepository.existsById(1L)).willReturn(Boolean.TRUE);
        assertTrue(activityGroupService.isActivityGroupExist(1L));
    }

    @Test
    public void shouldNotIsActivityGroupExistTest() {
        given(activityGroupRepository.existsById(1L)).willReturn(Boolean.FALSE);
        assertFalse(activityGroupService.isActivityGroupExist(1L));
    }

    @Test
    public void shouldUpdateTest() {
        Long groupId = 1L;
        ActivityGroup oldActivityGroup = new ActivityGroup(1L, "first", null, null);
        ActivityGroup newActivityGroup = new ActivityGroup(1L, "second", null, null);
        Optional<ActivityGroup> optionalGroup = Optional.of(oldActivityGroup);
        given(activityGroupRepository.findById(groupId)).willReturn(optionalGroup);
        given(activityGroupRepository.save(oldActivityGroup)).willReturn(newActivityGroup);
        ActivityGroup updated = activityGroupService.update(groupId, oldActivityGroup);
        assertEquals(newActivityGroup, updated);
    }

    @Test(expected = ActivityGroupNotFoundException.class)
    public void shouldNotUpdateTest() {
        Long groupId = 1L;
        ActivityGroup oldActivityGroup = new ActivityGroup(1L, "first", null, null);
        try {
            activityGroupService.update(groupId, oldActivityGroup);
            Assert.fail("Expected an ActivityGroupNotFountExpection to be thrown");
        } catch (ActivityGroupNotFoundException e) {
        }
        activityGroupService.update(groupId, oldActivityGroup);
    }

    private List<ActivityGroup> prepareMockData() {
        return Stream.of(new ActivityGroup(1L, "first", null, null), new ActivityGroup(2L, "second", null, null))
                .collect(Collectors.toList());
    }
}
