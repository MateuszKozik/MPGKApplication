package com.kozik.MPGK.exceptions;

import com.kozik.MPGK.exceptions.connectionExceptions.ConnectionAlreadyExistException;
import com.kozik.MPGK.exceptions.connectionExceptions.ConnectionAlreadyExistResponse;
import com.kozik.MPGK.exceptions.connectionExceptions.ConnectionNotFoundException;
import com.kozik.MPGK.exceptions.connectionExceptions.ConnectionNotFoundExceptionResponse;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceAlreadyExistException;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceAlreadyExistResponse;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceNotFoundException;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceNotFoundExceptionResponse;
import com.kozik.MPGK.exceptions.fluidExceptions.FluidAlreadyExistException;
import com.kozik.MPGK.exceptions.fluidExceptions.FluidAlreadyExistResponse;
import com.kozik.MPGK.exceptions.fluidExceptions.FluidNotFoundException;
import com.kozik.MPGK.exceptions.fluidExceptions.FluidNotFoundExceptionResponse;
import com.kozik.MPGK.exceptions.fluidPlaceExceptions.FluidPlaceAlreadyExistException;
import com.kozik.MPGK.exceptions.fluidPlaceExceptions.FluidPlaceAlreadyExistResponse;
import com.kozik.MPGK.exceptions.fluidPlaceExceptions.FluidPlaceNotFoundException;
import com.kozik.MPGK.exceptions.fluidPlaceExceptions.FluidPlaceNotFoundExceptionResponse;
import com.kozik.MPGK.exceptions.fluidRegistryExceptions.FluidRegistryAlreadyExistException;
import com.kozik.MPGK.exceptions.fluidRegistryExceptions.FluidRegistryAlreadyExistResponse;
import com.kozik.MPGK.exceptions.fluidRegistryExceptions.FluidRegistryNotFoundException;
import com.kozik.MPGK.exceptions.fluidRegistryExceptions.FluidRegistryNotFoundExceptionResponse;
import com.kozik.MPGK.exceptions.overviewTypeExceptions.OverviewTypeAlreadyExistException;
import com.kozik.MPGK.exceptions.overviewTypeExceptions.OverviewTypeAlreadyExistResponse;
import com.kozik.MPGK.exceptions.overviewTypeExceptions.OverviewTypeNotFoundException;
import com.kozik.MPGK.exceptions.overviewTypeExceptions.OverviewTypeNotFoundExceptionResonse;
import com.kozik.MPGK.exceptions.roleExceptions.RoleAlreadyExistException;
import com.kozik.MPGK.exceptions.roleExceptions.RoleAlreadyExistResponse;
import com.kozik.MPGK.exceptions.roleExceptions.RoleNotFoundException;
import com.kozik.MPGK.exceptions.roleExceptions.RoleNotFoundExceptionResponse;
import com.kozik.MPGK.exceptions.personExceptions.PersonNotFoundException;
import com.kozik.MPGK.exceptions.personExceptions.PersonNotFoundExceptionResponse;
import com.kozik.MPGK.exceptions.personExceptions.PersonAlreadyExistException;
import com.kozik.MPGK.exceptions.personExceptions.PersonAlreadyExistResponse;

import com.kozik.MPGK.exceptions.activityExceptions.*;
import com.kozik.MPGK.exceptions.activityGroupExceptions.*;
import com.kozik.MPGK.exceptions.overviewExceptions.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleDeviceNotFoundException(DeviceNotFoundException ex, WebRequest request) {
        DeviceNotFoundExceptionResponse exceptionResponse = new DeviceNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleDeviceAlreadyExistException(DeviceAlreadyExistException ex,
            WebRequest request) {
        DeviceAlreadyExistResponse existResponse = new DeviceAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleFluidNotFoundException(FluidNotFoundException ex, WebRequest request) {
        FluidNotFoundExceptionResponse exceptionResponse = new FluidNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleFluidAlreadyExistException(FluidAlreadyExistException ex,
            WebRequest request) {
        FluidAlreadyExistResponse existResponse = new FluidAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleOverviewTypeNotFoundException(OverviewTypeNotFoundException ex,
            WebRequest request) {
        OverviewTypeNotFoundExceptionResonse exceptionResonse = new OverviewTypeNotFoundExceptionResonse(
                ex.getMessage());
        return new ResponseEntity<Object>(exceptionResonse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleOverviewTypeAlreadyExistException(OverviewTypeAlreadyExistException ex,
            WebRequest request) {
        OverviewTypeAlreadyExistResponse existResponse = new OverviewTypeAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleConnectionNotFoundException(ConnectionNotFoundException ex,
            WebRequest request) {
        ConnectionNotFoundExceptionResponse exceptionResponse = new ConnectionNotFoundExceptionResponse(
                ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleConnectionAlreadyExistException(ConnectionAlreadyExistException ex,
            WebRequest request) {
        ConnectionAlreadyExistResponse existResponse = new ConnectionAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleRoleNotFoundException(RoleNotFoundException ex, WebRequest request) {
        RoleNotFoundExceptionResponse exceptionResponse = new RoleNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleRoleAlreadyExistException(RoleAlreadyExistException ex,
            WebRequest request) {
        RoleAlreadyExistResponse existResponse = new RoleAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleFluidRegistryNotFoundException(FluidRegistryNotFoundException ex,
            WebRequest request) {
        FluidRegistryNotFoundExceptionResponse exceptionResponse = new FluidRegistryNotFoundExceptionResponse(
                ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleFluidRegistryAlreadyExistException(FluidRegistryAlreadyExistException ex,
            WebRequest request) {
        FluidRegistryAlreadyExistResponse existResponse = new FluidRegistryAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleFluidPlaceNotFoundException(FluidPlaceNotFoundException ex,
            WebRequest request) {
        FluidPlaceNotFoundExceptionResponse exceptionResponse = new FluidPlaceNotFoundExceptionResponse(
                ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleFluidPlaceAlreadyExistException(FluidPlaceAlreadyExistException ex,
            WebRequest request) {
        FluidPlaceAlreadyExistResponse existResponse = new FluidPlaceAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handlePersonNotFoundException(PersonNotFoundException ex, WebRequest request) {
        PersonNotFoundExceptionResponse exceptionResponse = new PersonNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handlePersonAlreadyExistException(PersonAlreadyExistException ex,
            WebRequest request) {
                PersonAlreadyExistResponse existResponse = new PersonAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleActivityNotFoundException(ActivityNotFoundException ex, WebRequest request) {
        ActivityNotFoundExceptionResponse exceptionResponse = new ActivityNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleActivityAlreadyExistException(ActivityAlreadyExistException ex,
            WebRequest request) {
                ActivityAlreadyExistResponse existResponse = new ActivityAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleActivityGroupNotFoundException(ActivityGroupNotFoundException ex, WebRequest request) {
        ActivityGroupNotFoundExceptionResponse exceptionResponse = new ActivityGroupNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleActivityGroupAlreadyExistException(ActivityGroupAlreadyExistException ex,
            WebRequest request) {
                ActivityGroupAlreadyExistResponse existResponse = new ActivityGroupAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleOverviewNotFoundException(OverviewNotFoundException ex, WebRequest request) {
        OverviewNotFoundExceptionResponse exceptionResponse = new OverviewNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleOverviewAlreadyExistException(OverviewAlreadyExistException ex,
            WebRequest request) {
                OverviewAlreadyExistResponse existResponse = new OverviewAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.CONFLICT);
    }
}