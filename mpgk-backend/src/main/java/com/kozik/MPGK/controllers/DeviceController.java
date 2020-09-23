package com.kozik.MPGK.controllers;

import javax.validation.Valid;

import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.services.DeviceService;
import com.kozik.MPGK.services.MapValidationErrorService;
import com.kozik.MPGK.utilities.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@CrossOrigin
@Api(tags = "devices", description = "Operations about device")
@RequestMapping("/api/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all devices
    @ApiOperation(value = "Get all devices")
    @GetMapping("")
    public Iterable<Device> getDevices() {
        return deviceService.listAll();
    }

    // Get single device
    @ApiOperation(value = "Get device by id")
    @GetMapping("/{deviceId}")
    public ResponseEntity<?> getDevice(
            @ApiParam(value = "Unique id of device", example = "123") @PathVariable Long deviceId) {

        return new ResponseEntity<>(deviceService.get(deviceId), HttpStatus.OK);
    }

    // Create device
    @ApiOperation(value = "Create new device")
    @PostMapping("")
    public ResponseEntity<?> createDevice(@ApiParam(value = "Created device object") @Valid @RequestBody Device device,
            BindingResult result) {

        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<>(deviceService.save(device), HttpStatus.CREATED);
    }

    // Update device
    @ApiOperation(value = "Update device")
    @PutMapping("/{deviceId}")
    public ResponseEntity<?> updateDevice(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long deviceId,
            @ApiParam(value = "Updated device object") @Valid @RequestBody Device device, BindingResult result) {

        if (result.hasErrors())
            return mapValidationErrorService.MapValidationService(result);

        return new ResponseEntity<>(deviceService.update(deviceId, device), HttpStatus.OK);
    }

    // Delete device
    @ApiOperation(value = "Delete device")
    @DeleteMapping("/{deviceId}")
    public ResponseEntity<?> deleteDevice(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long deviceId) {

        deviceService.delete(deviceId);
        return new ResponseEntity<>(new Message("Device with id: " + deviceId + " has been removed"), HttpStatus.OK);
    }
}