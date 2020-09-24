package com.kozik.MPGK.controllers;

import javax.validation.Valid;

import com.kozik.MPGK.entities.User;
import com.kozik.MPGK.payload.JWTLoginSuccessResponse;
import com.kozik.MPGK.payload.LoginRequest;
import com.kozik.MPGK.security.JwtTokenProvider;
import com.kozik.MPGK.services.MapValidationErrorService;
import com.kozik.MPGK.services.UserService;
import com.kozik.MPGK.validator.UserValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import static com.kozik.MPGK.security.SecurityConstraints.TOKEN_PREFIX;;

@RestController
@CrossOrigin
@Api(tags = "users", description = "Register and login operations")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Register new user
    @ApiOperation(value = "Register new user")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@ApiParam(value = "Created user object") @Valid @RequestBody User user,
            BindingResult result) {
        userValidator.validate(user, result);
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

    // Authenticate user
    @ApiOperation(value = "Authenticate user")
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(
            @ApiParam(value = "Login data") @Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

}