package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceAlreadyExistException;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceNotFoundException;
import com.kozik.MPGK.repositories.DeviceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public Iterable<Device> listAll() {
        return deviceRepository.findAll();
    }

    public Device save(Device device) {
        if (device.getDeviceId() != null) {
            throw new DeviceAlreadyExistException(device.getDeviceId());
        }
        return deviceRepository.save(device);
    }

    public Device get(Long deviceId) {
        Device device = deviceRepository.findById(deviceId).orElseThrow(() -> new DeviceNotFoundException(deviceId));
        return device;
    }

    public void delete(Long deviceId) {
        deviceRepository.delete(get(deviceId));
    }

    public Boolean isDeviceExist(Long id) {
        return deviceRepository.existsById(id);
    }

    public Device update(Long deviceId, Device device) {
        Device newDevice = deviceRepository.findById(deviceId).map(element -> {
            element.setName(device.getName());
            element.setStatus(device.getStatus());
            return deviceRepository.save(element);
        }).orElseThrow(() -> new DeviceNotFoundException(deviceId));

        return newDevice;
    }
}