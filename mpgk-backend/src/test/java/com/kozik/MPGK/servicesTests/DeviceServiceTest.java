package com.kozik.MPGK.servicesTests;

import com.google.common.collect.Iterables;
import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceAlreadyExistException;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceNotFoundException;
import com.kozik.MPGK.repositories.DeviceRepository;
import com.kozik.MPGK.services.DeviceService;

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
public class DeviceServiceTest {

    @Mock
    DeviceRepository deviceRepository;

    @InjectMocks
    DeviceService deviceService;

    @Test
    public void shouldListAllTest() {

        // Given
        List<Device> devices = Stream
                .of(new Device(1L, "first device", true, null), new Device(2L, "second device", true, null))
                .collect(Collectors.toList());
        given(deviceRepository.findAll()).willReturn(devices);

        // When
        Integer size = Iterables.size(deviceService.listAll());

        // Then
        assertEquals(2, size);
    }

    @Test
    public void shouldSaveTest() {

        // Given
        Device device = new Device("first device", true, null);
        given(deviceRepository.save(device)).willReturn(device);

        // When
        Device newDevice = deviceService.save(device);

        // Then
        assertEquals(device, newDevice);
    }

    @Test(expected = DeviceAlreadyExistException.class)
    public void shouldNotSaveTest() {

        // Given
        Device device = new Device(1L, "first device", true, null);

        // When
        try {
            deviceService.save(device);
            Assert.fail("Expected an DeviceAlreadyExistException to be thrown");
        } catch (DeviceAlreadyExistException e) {
        }

        // Then
        deviceService.save(device);
    }

    @Test
    public void shouldGetTest() {

        // Given
        Long deviceId = 1L;
        Optional<Device> device = Optional.of(new Device(deviceId, "first device", true, null));
        given(deviceRepository.findById(deviceId)).willReturn(device);

        // When
        Device getDevice = deviceService.get(deviceId);

        // Then
        verify(deviceRepository).findById(deviceId);
        assertEquals(device.get(), getDevice);
    }

    @Test(expected = DeviceNotFoundException.class)
    public void shouldNotGetTest() {

        // When
        try {
            deviceService.get(1L);
            Assert.fail("Expected an DeviceNotFoundExpection to be thrown");
        } catch (DeviceNotFoundException e) {
        }

        // Then
        deviceService.get(1L);
    }

    @Test
    public void shouldDeleteTest() {

        // Given
        Long deviceId = 1L;
        Device device = new Device(deviceId, "first device", true, null);
        given(deviceRepository.findById(deviceId)).willReturn(Optional.of(device));

        // When
        deviceService.delete(deviceId);

        // Then
        verify(deviceRepository).findById(deviceId);
        verify(deviceRepository).delete(device);
    }

    @Test(expected = DeviceNotFoundException.class)
    public void shouldNotDeleteTest() {

        // Given
        Long deviceId = 1L;

        // When
        try {
            deviceService.delete(1L);
            Assert.fail("Expected an DeviceNotFoundExpection to be thrown");
        } catch (DeviceNotFoundException e) {
        }

        // Then
        deviceService.delete(deviceId);
    }

    @Test
    public void shouldIsDeviceExistTest() {

        // Given
        Long deviceId = 1L;
        given(deviceRepository.existsById(deviceId)).willReturn(Boolean.TRUE);

        // When
        Boolean isExist = deviceService.isDeviceExist(deviceId);

        // Then
        assertTrue(isExist);
    }

    @Test
    public void shouldNotIsDeviceExistTest() {

        // Given
        Long deviceId = 1L;
        given(deviceRepository.existsById(deviceId)).willReturn(Boolean.FALSE);

        // When
        Boolean isExist = deviceService.isDeviceExist(deviceId);

        // Then
        assertFalse(isExist);
    }

    @Test
    public void shouldUpdateTest() {

        // Given
        Long deviceId = 1L;
        Device oldDevice = new Device(deviceId, "device", true, null);
        Device newDevice = new Device(deviceId, "updated device", true, null);
        given(deviceRepository.findById(deviceId)).willReturn(Optional.of(oldDevice));
        given(deviceRepository.save(oldDevice)).willReturn(newDevice);

        // When
        Device updatedDevice = deviceService.update(deviceId, oldDevice);

        // Then
        verify(deviceRepository).findById(deviceId);
        verify(deviceRepository).save(oldDevice);
        assertEquals(newDevice, updatedDevice);

    }

    @Test(expected = DeviceNotFoundException.class)
    public void shouldNotUpdateTest() {

        // Given
        Long deviceId = 1L;
        Device oldDevice = new Device(deviceId, "device", true, null);

        // When
        try {
            deviceService.update(deviceId, oldDevice);
            Assert.fail("Expected an DeviceNotFoundExpection to be thrown");
        } catch (DeviceNotFoundException e) {
        }

        // Then
        deviceService.update(deviceId, oldDevice);
    }
}
