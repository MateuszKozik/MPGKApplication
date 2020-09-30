package com.kozik.MPGK.servicesTests;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;
import java.util.stream.Stream;
import java.util.stream.Collectors;
import java.util.Optional;

import com.google.common.collect.Iterables;
import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.exceptions.activityExceptions.ActivityAlreadyExistException;
import com.kozik.MPGK.exceptions.activityExceptions.ActivityNotFoundException;
import com.kozik.MPGK.repositories.ActivityGroupRepository;
import com.kozik.MPGK.repositories.ActivityRepository;
import com.kozik.MPGK.services.ActivityService;
import com.kozik.MPGK.services.ConnectionService;
import com.kozik.MPGK.utilities.ActivityObject;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(MockitoJUnitRunner.class)
public class ActivityServiceTest {

    @Mock
    ActivityRepository activityRepository;

    @Mock
    ActivityGroupRepository activityGroupRepository;

    @Mock
    ConnectionService connectionService;

    @InjectMocks
    ActivityService activityService;

    @Test
    public void shouldListAllTest() {

        // Given
        List<Activity> activities = Stream
                .of(new Activity(1L, "name", "type", "emsr", "setting", "list", null, null),
                        new Activity(2L, "name2", "type2", "emsr2", "setting2", "list2", null, null))
                .collect(Collectors.toList());
        given(activityRepository.findAll()).willReturn(activities);

        // When
        Integer size = Iterables.size(activityService.listAll());

        // Then
        assertEquals(2, size);
    }

    @Test
    public void shouldSaveTest() {

        // Given
        Activity activity = new Activity("name", "type", "emsr", "setting", "list", null, null);
        given(activityRepository.save(activity)).willReturn(activity);

        // When
        Activity newActivity = activityService.save(activity);

        // Then
        assertEquals(activity, newActivity);
    }

    @Test(expected = ActivityAlreadyExistException.class)
    public void shouldNotSaveTest() {

        // Given
        Activity activity = new Activity(1L, "name", "type", "emsr", "setting", "list", null, null);

        // When
        try {
            activityService.save(activity);
            Assert.fail("Expected an ActivityAlreadyExistException to be thrown");
        } catch (ActivityAlreadyExistException e) {
        }

        // Then
        activityService.save(activity);

    }

    @Test
    public void shouldGetTest() {

        // Given
        Long activityId = 1L;
        Optional<Activity> activity = Optional
                .of(new Activity(activityId, "name", "type", "emsr", "setting", "list", null, null));
        given(activityRepository.findById(activityId)).willReturn(activity);

        // When
        Activity getActivity = activityService.get(activityId);

        // Then
        verify(activityRepository).findById(activityId);
        assertEquals(activity.get(), getActivity);
    }

    @Test(expected = ActivityNotFoundException.class)
    public void shouldNotGetTest() {

        // When
        try {
            activityService.get(1L);
            Assert.fail("Expected an ActivityNotFoundException to be thrown");
        } catch (ActivityNotFoundException e) {
        }

        // Then
        activityService.get(1L);
    }

    @Test
    public void shouldDeleteTest() {

        // Given
        Long activityId = 1L;
        Activity activity = new Activity(1L, "name", "type", "emsr", "setting", "list", null, null);
        given(activityRepository.findById(activityId)).willReturn(Optional.of(activity));

        // When
        activityService.delete(activityId);

        // Then
        verify(activityRepository).findById(activityId);
        verify(activityRepository).delete(activity);
    }

    @Test(expected = ActivityNotFoundException.class)
    public void shouldNotDeleteTest() {

        // Given
        Long activityId = 1L;

        // When
        try {
            activityService.delete(activityId);
            Assert.fail("Expected an ActivityNotFoundException to be thrown");
        } catch (ActivityNotFoundException e) {
        }

        // Then
        activityService.delete(activityId);
    }

    @Test
    public void shouldIsActivityExistTest() {

        // Given
        Long activityId = 1L;
        given(activityRepository.existsById(activityId)).willReturn(Boolean.TRUE);

        // When
        Boolean isExist = activityService.isActivityExist(activityId);

        // Then
        assertTrue(isExist);
    }

    @Test
    public void shouldNotIsActivityExistTest() {

        // Given
        Long activityId = 1L;
        given(activityRepository.existsById(activityId)).willReturn(Boolean.FALSE);

        // When
        Boolean isExist = activityService.isActivityExist(activityId);

        // Then
        assertFalse(isExist);
    }

    @Test
    public void shouldUpdateTest() {

        // Given
        Long activityId = 1L;
        Activity oldActivity = new Activity(activityId, "name", "type", "emsr", "setting", "list", null, null);
        Activity newActivity = new Activity(activityId, "name2", "type2", "emsr2", "setting2", "list2", null, null);
        given(activityRepository.findById(activityId)).willReturn(Optional.of(oldActivity));
        given(activityRepository.save(oldActivity)).willReturn(newActivity);

        // When
        Activity updatedActivity = activityService.update(activityId, oldActivity);

        // Then
        verify(activityRepository).findById(activityId);
        verify(activityRepository).save(oldActivity);
        assertEquals(newActivity, updatedActivity);
    }

    @Test(expected = ActivityNotFoundException.class)
    public void shouldNotUpdateTest() {

        // Given
        Long activityId = 1L;
        Activity oldActivity = new Activity(1L, "name", "type", "emsr", "setting", "list", null, null);

        // When
        try {
            activityService.update(activityId, oldActivity);
            Assert.fail("Expected an ActivityNotFoundException to be thrown");
        } catch (ActivityNotFoundException e) {
        }

        // Then
        activityService.update(activityId, oldActivity);
    }

    @Test
    public void shouldgetActivitiesByConnectionTest() {

        // Given
        Long connectionId = 1L;
        List<Activity> activities1 = Stream
                .of(new Activity(1L, "name", "type", "emsr", "setting", "list", null, null),
                        new Activity(2L, "name2", "type2", "emsr2", "setting2", "", null, null))
                .collect(Collectors.toList());
        List<Activity> activities2 = Stream
                .of(new Activity(3L, "name3", "type3", "emsr3", "setting3", "list", null, null),
                        new Activity(4L, "name4", "type4", "emsr4", "setting4", "", null, null))
                .collect(Collectors.toList());
        List<ActivityGroup> activitiesGroups = Stream.of(new ActivityGroup(1L, "first", activities1, null),
                new ActivityGroup(2L, "second", activities2, null)).collect(Collectors.toList());
        Connection connection = new Connection(1L, "name", true, null, null, activitiesGroups, null);
        ActivityObject testObject = new ActivityObject(new ActivityGroup(1L, "first", activities1, null), activities1,
                true, true);
        given(connectionService.get(connectionId)).willReturn(connection);
        given(activityGroupRepository.findByConnection(connection)).willReturn(activitiesGroups);
        given(activityRepository.findByActivityGroup(activitiesGroups.get(0))).willReturn(activities1);
        given(activityRepository.findByActivityGroup(activitiesGroups.get(1))).willReturn(activities2);

        // When
        List<ActivityObject> activityObjects = activityService.getActivitiesByConnection(connectionId);

        // Then
        assertEquals(2, activityObjects.size());
        assertEquals(testObject, activityObjects.get(0));
    }
}
