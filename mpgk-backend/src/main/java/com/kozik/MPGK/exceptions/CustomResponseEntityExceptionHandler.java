package com.kozik.MPGK.exceptions;

import com.kozik.MPGK.exceptions.deviceExceptions.DeviceAlreadyExistException;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceAlreadyExistResponse;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceNotFoundException;
import com.kozik.MPGK.exceptions.deviceExceptions.DeviceNotFoundExceptionResponse;

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
}