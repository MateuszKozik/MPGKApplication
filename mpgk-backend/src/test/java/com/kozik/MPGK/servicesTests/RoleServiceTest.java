package com.kozik.MPGK.servicesTests;

import com.google.common.collect.Iterables;
import com.kozik.MPGK.entities.Role;
import com.kozik.MPGK.exceptions.roleExceptions.RoleAlreadyExistException;
import com.kozik.MPGK.exceptions.roleExceptions.RoleNotFoundException;
import com.kozik.MPGK.repositories.RoleRepository;
import com.kozik.MPGK.services.RoleService;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class RoleServiceTest {

    @Mock
    RoleRepository roleRepository;

    @InjectMocks
    RoleService roleService;

    @Test
    public void shouldListAllTest() {

        // Given
        List<Role> roles = Stream
                .of(new Role(1L, "first", null), new Role(2L, "second", null))
                .collect(Collectors.toList());
        given(roleRepository.findAll()).willReturn(roles);

        // When
        Integer size = Iterables.size(roleService.listAll());

        // Then
        assertEquals(2, size);
    }

    @Test
    public void shouldSaveTest() {

        // Given
        Role role = new Role("first", null);
        given(roleRepository.save(role)).willReturn(role);

        // When
        Role newRole = roleService.save(role);

        // Then
        assertEquals(role, newRole);
    }

    @Test(expected = RoleAlreadyExistException.class)
    public void shouldNotSaveTest() {

        // Given
        Role role = new Role(1L, "first", null);

        // When
        try {
            roleService.save(role);
            Assert.fail("Expected an RoleAlreadyExistException to be thrown");
        } catch (RoleAlreadyExistException e) {
        }

        // Then
        roleService.save(role);
    }

    @Test
    public void shouldGetTest() {

        // Given
        Long roleId = 1L;
        Optional<Role> role = Optional.of(new Role(roleId, "first", null));
        given(roleRepository.findById(roleId)).willReturn(role);

        // When
        Role getRole = roleService.get(roleId);

        // Then
        verify(roleRepository).findById(roleId);
        assertEquals(role.get(), getRole);
    }

    @Test(expected = RoleNotFoundException.class)
    public void shouldNotGetTest() {

        // When
        try {
            roleService.get(1L);
            Assert.fail("Expected an RoleNotFoundException to be thrown");
        } catch (RoleNotFoundException e) {
        }

        // Then
        roleService.get(1L);
    }

    @Test
    public void shouldDeleteTest() {

        // Given
        Long roleId = 1L;
        Role role = new Role(roleId, "first", null);
        given(roleRepository.findById(roleId)).willReturn(Optional.of(role));

        // When
        roleService.delete(roleId);

        // Then
        verify(roleRepository).findById(roleId);
        verify(roleRepository).delete(role);
    }

    @Test(expected = RoleNotFoundException.class)
    public void shouldNotDeleteTest() {

        // Given
        Long roleId = 1L;

        // When
        try {
            roleService.delete(1L);
            Assert.fail("Expected an RoleNotFoundException to be thrown");
        } catch (RoleNotFoundException e) {
        }

        // Then
        roleService.delete(roleId);
    }

    @Test
    public void shouldIsRoleExistTest() {

        // Given
        Long roleId = 1L;
        given(roleRepository.existsById(roleId)).willReturn(Boolean.TRUE);

        // When
        Boolean isExist = roleService.isRoleExist(roleId);

        // Then
        assertTrue(isExist);
    }

    @Test
    public void shouldNotIsRoleExistTest() {

        // Given
        Long roleId = 1L;
        given(roleRepository.existsById(roleId)).willReturn(Boolean.FALSE);

        // When
        Boolean isExist = roleService.isRoleExist(roleId);

        // Then
        assertFalse(isExist);
    }
    
}
