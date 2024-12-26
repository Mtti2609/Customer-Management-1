package com.API.API.controller;

import com.API.API.model.Permission;
import com.API.API.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    // Get all permissions
    @GetMapping("/all")
    public ResponseEntity<List<Permission>> getAllPermissions() {
        List<Permission> permissions = permissionService.getAllPermissions();
        return ResponseEntity.ok(permissions);
    }

    // Get permissions by departmentId
    @GetMapping("/{departmentId}")
    public ResponseEntity<List<Permission>> getPermissionsByDepartmentId(@PathVariable Integer departmentId) {
        List<Permission> permissions = permissionService.getPermissionsByDepartmentId(departmentId);
        if (permissions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(permissions);
    }


}
