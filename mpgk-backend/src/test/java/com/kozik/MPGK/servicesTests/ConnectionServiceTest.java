package com.kozik.MPGK.servicesTests;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.google.common.collect.Iterables;
import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.entities.InspectionType;
import com.kozik.MPGK.exceptions.connectionExceptions.ConnectionAlreadyExistException;
import com.kozik.MPGK.exceptions.connectionExceptions.ConnectionNotFoundException;
import com.kozik.MPGK.repositories.ConnectionRepository;
import com.kozik.MPGK.services.ConnectionService;

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
public class ConnectionServiceTest {

    @Mock
    ConnectionRepository connectionRepository;

    @InjectMocks
    ConnectionService connectionService;

    @Test
    public void shouldListAllTest() {

        // Given
        List<Connection> connections = Stream.of(new Connection(1L, "name", true, null, null, null, null),
                new Connection(2L, "name2", true, null, null, null, null)).collect(Collectors.toList());
        given(connectionRepository.findAll()).willReturn(connections);

        // When
        Integer size = Iterables.size(connectionService.listAll());

        // Then
        assertEquals(2, size);
    }

    @Test
    public void shouldSaveTest() {

        // Given
        Device device = new Device(1L, "device", true, null);
        InspectionType inspectionType = new InspectionType(1L, "everyday", null);
        List<Activity> activities = Stream.of(new Activity(1L, "name", "type", "emsr", "setting", "list", null, null))
                .collect(Collectors.toList());
        List<ActivityGroup> activitiesGroups = Stream.of(new ActivityGroup(1L, "first", activities, null))
                .collect(Collectors.toList());
        Connection connection = new Connection("testConnection", true, device, inspectionType, activitiesGroups, null);
        given(connectionRepository.save(connection)).willReturn(connection);

        // When
        Connection newConnection = connectionService.save(connection);

        // Then
        assertEquals(connection, newConnection);
    }

    @Test
    public void shouldSaveWithExtraActivityTest() {

        // Given
        Device device = new Device(1L, "device", true, null);
        InspectionType inspectionType = new InspectionType(1L, "Na żądanie", null);
        List<Activity> activities = Stream.of(new Activity(1L, "name", "type", "emsr", "setting", "list", null, null))
                .collect(Collectors.toList());
        List<ActivityGroup> activitiesGroups = Stream.of(new ActivityGroup(1L, "first", activities, null))
                .collect(Collectors.toList());
        Connection connection = new Connection("testConnection", true, device, inspectionType, activitiesGroups, null);
        given(connectionRepository.save(connection)).willReturn(connection);

        // When
        Connection newConnection = connectionService.save(connection);
        Integer size = newConnection.getActivitiesGroups().size();

        // Then
        assertEquals(2, size);
    }

    @Test(expected = ConnectionAlreadyExistException.class)
    public void shouldNotSaveTest() {

        // Given
        Connection connection = new Connection(1L, "testConnection", true, null, null, null, null);

        // When
        try {
            connectionService.save(connection);
            fail("Expected an ConnectionAlreadyExistException to be thrown");
        } catch (ConnectionAlreadyExistException e) {
        }

        // Then
        connectionService.save(connection);
    }

    @Test
    public void shouldGetTest() {

        // Given
        Long connectionId = 1L;
        Optional<Connection> connection = Optional
                .of(new Connection(connectionId, "name", true, null, null, null, null));
        given(connectionRepository.findById(connectionId)).willReturn(connection);

        // When
        Connection getConnection = connectionService.get(connectionId);

        // Then
        verify(connectionRepository).findById(connectionId);
        assertEquals(connection.get(), getConnection);
    }

    @Test(expected = ConnectionNotFoundException.class)
    public void shouldNotGetTest() {

        // Given
        Long connectionId = 1L;

        // When
        try {
            connectionService.get(connectionId);
            fail("Expected an ConnectionNotFoundException to be thrown");
        } catch (ConnectionNotFoundException e) {
        }

        // Then
        connectionService.get(connectionId);
    }

    @Test
    public void shouldDeleteTest() {

        // Given
        Long connectionId = 1L;
        Connection connection = new Connection(connectionId, "name", true, null, null, null, null);
        given(connectionRepository.findById(connectionId)).willReturn(Optional.of(connection));

        // When
        connectionService.delete(connectionId);

        // Then
        verify(connectionRepository).findById(connectionId);
        verify(connectionRepository).delete(connection);
    }

    @Test(expected = ConnectionNotFoundException.class)
    public void shouldNotDeleteTest() {

        // Given
        Long connectionId = 1L;

        // When
        try {
            connectionService.delete(connectionId);
            fail("Expected an ConnectionNotFoundException to be thrown");
        } catch (ConnectionNotFoundException e) {
        }

        // Then
        connectionService.delete(connectionId);
    }

    @Test
    public void shouldIsAlreadyExistTest() {

        // Given
        Long connectionId = 1L;
        given(connectionRepository.existsById(connectionId)).willReturn(Boolean.TRUE);

        // When
        Boolean isExist = connectionService.isConnectionExist(connectionId);

        // Then
        assertTrue(isExist);
    }

    @Test
    public void shouldNotIsAlreadyExistTest() {

        // Given
        Long connectionId = 1L;
        given(connectionRepository.existsById(connectionId)).willReturn(Boolean.FALSE);

        // When
        Boolean isExist = connectionService.isConnectionExist(connectionId);

        // Then
        assertFalse(isExist);
    }

    @Test
    public void shouldUpdateTest() {

        // Given
        Long connectionId = 1L;
        Connection oldConnection = new Connection(connectionId, "connection", true, null, null, null, null);
        Connection newConnection = new Connection(connectionId, "updatedConnection", true, null, null, null, null);
        given(connectionRepository.findById(connectionId)).willReturn(Optional.of(oldConnection));
        given(connectionRepository.save(oldConnection)).willReturn(oldConnection);

        // When
        Connection updatedConnection = connectionService.update(connectionId, newConnection);

        // Then
        verify(connectionRepository).findById(connectionId);
        verify(connectionRepository).save(oldConnection);
        assertEquals(oldConnection, updatedConnection);
    }

    @Test(expected = ConnectionNotFoundException.class)
    public void shouldNotUpdateTest() {

        // Given
        Long connectionId = 1L;
        Connection oldConnection = new Connection(connectionId, "connection", true, null, null, null, null);

        // When
        try {
            connectionService.update(connectionId, oldConnection);
            fail("Expected an ConnectionNotFoundException to be thrown");
        } catch (ConnectionNotFoundException e) {
        }

        // Then
        connectionService.update(connectionId, oldConnection);
    }
}
