package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.repositories.DeviceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeviceService {

    @Autowired private DeviceRepository deviceRepository;

    public List<Device> listAll(){
        return deviceRepository.findAll();
    }

    public void save(Device device){
        deviceRepository.save(device);
    }

    public Device get(Long id){
        return deviceRepository.findById(id).get();
    }

    public void delete(Long id){
        deviceRepository.deleteById(id);
    }

    public Boolean isDeviceExist(Long id){
       return deviceRepository.existsById(id);
    }

    public Device update(Long id, Device device){
        Device currentDevice = get(id);
        currentDevice.setName(device.getName());
        currentDevice.setStatus(device.getStatus());
        currentDevice.setType(device.getType());
        save(currentDevice);
        return currentDevice;
    }
}