package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.entities.InspectionType;
import com.kozik.MPGK.services.ActivityGroupService;
import com.kozik.MPGK.services.ConnectionService;
import com.kozik.MPGK.services.DeviceService;
import com.kozik.MPGK.services.InspectionTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ConnectionController {

    @Autowired private ConnectionService connectionService;
    @Autowired private ActivityGroupService activityGroupService;
    @Autowired private InspectionTypeService inspectionTypeService;
    @Autowired private DeviceService deviceService;

    @GetMapping(value = "/connection/list")
    public String getAll(Model model){
        List<Connection> connections = connectionService.listAll();
        model.addAttribute("connections", connections);
        return "views/connection/list";
    }

    @GetMapping(value = "/connection/add")
    public String add(Model model){
        List<ActivityGroup> activitiesGroups = activityGroupService.listAll();
        List<InspectionType> inspectionsType = inspectionTypeService.listAll();
        List<Device> devices = deviceService.listAll();
        Connection connection = new Connection();
        model.addAttribute("connection", connection);
        model.addAttribute("activitiesGroups", activitiesGroups);
        model.addAttribute("inspectionsType", inspectionsType);
        model.addAttribute("devices", devices);
        return "views/connection/add";
    }

    @PostMapping(value = "/connection/add")
    public String add(@ModelAttribute("connection")Connection connection,
    @RequestParam(name = "activityGroup", required = false)ActivityGroup activityGroup,
    @RequestParam(name = "inspectionType", required = false)InspectionType inspectionType,
    @RequestParam(name = "device", required = false)Device device){
        connection.setActivityGroup(activityGroup);
        connection.setInspectionType(inspectionType);
        connection.setDevice(device);
        connectionService.save(connection);
        return "redirect:/connection/list";
    }

    @GetMapping(value = "/connection/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        List<ActivityGroup> activitiesGroups = activityGroupService.listAll();
        List<InspectionType> inspectionsType = inspectionTypeService.listAll();
        List<Device> devices = deviceService.listAll();
        Connection connection = connectionService.get(id);
        model.addAttribute("connection", connection);
        model.addAttribute("activitiesGroups", activitiesGroups);
        model.addAttribute("inspectionsType", inspectionsType);
        model.addAttribute("devices", devices);
        return "views/connection/edit";
    }

    @PostMapping(value = "/connection/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("connection")Connection connection,
    @RequestParam(name = "activityGroup", required = false)ActivityGroup activityGroup,
    @RequestParam(name = "inspectionType", required = false)InspectionType inspectionType,
    @RequestParam(name = "device", required = false)Device device){
        connection.setConnectionId(id);
        connection.setActivityGroup(activityGroup);
        connection.setInspectionType(inspectionType);
        connection.setDevice(device);
        connectionService.save(connection);
        return "redirect:/connection/list";
    }

    @GetMapping(value = "/connection/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        connectionService.delete(id);
        return "redirect:/connection/list";
    }
}