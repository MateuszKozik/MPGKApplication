package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.services.DeviceService;
import com.kozik.MPGK.utilities.Message;

import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    // Get all devices
    @GetMapping("")
    public ResponseEntity<List<Device>> getDevices() {

        List<Device> devices = deviceService.listAll();
        if (devices.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Device>>(devices, HttpStatus.OK);
    }

    // Get single device
    @GetMapping("/{deviceId}")
    public ResponseEntity<?> getDevice(@PathVariable Long deviceId) {

        return new ResponseEntity<Device>(deviceService.get(deviceId), HttpStatus.OK);
    }

    // Create device
    @PostMapping("")
    public ResponseEntity<?> createDevice(@RequestBody Device device) {

        return new ResponseEntity<Device>(deviceService.save(device), HttpStatus.CREATED);
    }

    // Update device
    @PutMapping("/{deviceId}")
    public ResponseEntity<?> updateDevice(@PathVariable Long deviceId, @RequestBody Device device) {

        return new ResponseEntity<Device>(deviceService.update(deviceId, device), HttpStatus.OK);
    }

    // Delete device
    @DeleteMapping("/{deviceId}")
    public ResponseEntity<?> deleteDevice(@PathVariable("deviceId") Long deviceId) {

        deviceService.delete(deviceId);
        return new ResponseEntity<Message>(new Message("Device with id: " + deviceId + " has been removed"),
                HttpStatus.OK);
    }
}