package com.kozik.MPGK.controllers;

import java.util.List;
import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.services.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class DeviceController {

    @Autowired private DeviceService deviceService;

    @GetMapping(value = "/device/list")
    public String getAll(Model model){
        List<Device> devices = deviceService.listAll();
        model.addAttribute("devices", devices);
        return "views/device/list";
    }

    @GetMapping(value = "/device/add")
    public String add(Model model){
        Device device = new Device();
        model.addAttribute("device", device);
        return "views/device/add";
    }

    @PostMapping(value = "/device/add")
    public String add(@ModelAttribute("device")Device device){
        deviceService.save(device);
        return "redirect:/device/list";
    }

    @GetMapping(value = "/device/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        Device device = deviceService.get(id);
        model.addAttribute("device", device);
        return "views/device/edit";
    }

    @PostMapping(value = "/device/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("device")Device device){
        device.setDeviceId(id);
        deviceService.save(device);
        return "redirect:/device/list";
    }

    @GetMapping(value = "/device/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        deviceService.delete(id);
        return "redirect:/device/list";
    }
}