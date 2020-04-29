package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.services.DeviceService;
import com.kozik.MPGK.utilities.ErrorMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class DeviceController {

    @Autowired private DeviceService deviceService;

    //Get all devices
    @GetMapping("/devices")
    public ResponseEntity<List<Device>> getDevices(){
        List<Device> devices = deviceService.listAll();
        if(devices.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Device>>(devices, HttpStatus.OK);
    }

    //Get single device
    @GetMapping("/devices/{deviceId}")
    public ResponseEntity<?> getDevice(@PathVariable("deviceId")Long deviceId){
        if(!deviceService.isDeviceExist(deviceId)){
            return new ResponseEntity<>(new ErrorMessage("Device with id " + deviceId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Device device = deviceService.get(deviceId);
        return new ResponseEntity<Device>(device, HttpStatus.OK);
    }

    //Create device
    @PostMapping("/devices")
    public ResponseEntity<?> createDevice(@RequestBody Device device, UriComponentsBuilder builder){
        Long deviceId = device.getDeviceId();
        if(deviceId != null){
            return new ResponseEntity<>(new ErrorMessage("Unable to create. Device with id " + deviceId
            + " already exist."), HttpStatus.CONFLICT);
        }
        deviceService.save(device);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/devices/{deviceId}").buildAndExpand(device.getDeviceId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Update device
    @PutMapping("/devices/{deviceId}")
    public ResponseEntity<?> updateDevice(@PathVariable("deviceId")Long deviceId, @RequestBody Device device){
        if(!deviceService.isDeviceExist(deviceId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to update. Device with id " + deviceId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Device currentDevice = deviceService.update(deviceId, device);
        return new ResponseEntity<Device>(currentDevice, HttpStatus.OK);
    }

    //Delete device
    @DeleteMapping("/devices/{deviceId}")
    public ResponseEntity<?> deleteDevice(@PathVariable("deviceId")Long deviceId){
        if(!deviceService.isDeviceExist(deviceId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. Device with id " + deviceId + " not found."),
            HttpStatus.NOT_FOUND);
        } 
        deviceService.delete(deviceId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}