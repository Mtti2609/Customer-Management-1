package com.API.API.controller;

import com.API.API.model.DepartmentPermission;
import com.API.API.service.DepartmentPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/department-permissions")
public class DepartmentPermissionController {

    @Autowired
    private DepartmentPermissionService departmentPermissionService;

    // Assign permissions to a department
    @PostMapping("/assign")
    public ResponseEntity<String> assignPermissionsToDepartment(@RequestBody AssignPermissionsRequest request) {
        try {
            if (request.getDepartmentId() == null || request.getPermissionIds() == null || request.getPermissionIds().isEmpty()) {
                return ResponseEntity.badRequest().body("Department ID hoặc danh sách quyền không được để trống.");
            }

            departmentPermissionService.assignPermissionsToDepartment(request.getDepartmentId(), request.getPermissionIds());
            return ResponseEntity.ok("Gán quyền thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi gán quyền: " + e.getMessage());
        }
    }

    // Remove a permission from a department
    @DeleteMapping("/remove")
    public ResponseEntity<String> removePermissionFromDepartment(@RequestBody RemovePermissionRequest request) {
        try {
            if (request.getDepartmentId() == null || request.getPermissionId() == null) {
                return ResponseEntity.badRequest().body("Department ID hoặc Permission ID không được để trống.");
            }

            departmentPermissionService.removePermissionFromDepartment(request.getDepartmentId(), request.getPermissionId());
            return ResponseEntity.ok("Xóa quyền thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi xóa quyền: " + e.getMessage());
        }
    }


    // Get permissions by department ID
    @GetMapping("/{departmentId}")
    public ResponseEntity<List<DepartmentPermission>> getPermissionsByDepartmentId(@PathVariable Integer departmentId) {
        try {
            List<DepartmentPermission> permissions = departmentPermissionService.getPermissionsByDepartmentId(departmentId);
            if (permissions.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(permissions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DTO for assigning permissions
    public static class AssignPermissionsRequest {
        private Integer departmentId;
        private List<Integer> permissionIds;

        public Integer getDepartmentId() {
            return departmentId;
        }

        public void setDepartmentId(Integer departmentId) {
            this.departmentId = departmentId;
        }

        public List<Integer> getPermissionIds() {
            return permissionIds;
        }

        public void setPermissionIds(List<Integer> permissionIds) {
            this.permissionIds = permissionIds;
        }
    }

    // DTO for removing a permission
    public static class RemovePermissionRequest {
        private Integer departmentId;
        private Integer permissionId;

        public Integer getDepartmentId() {
            return departmentId;
        }

        public void setDepartmentId(Integer departmentId) {
            this.departmentId = departmentId;
        }

        public Integer getPermissionId() {
            return permissionId;
        }

        public void setPermissionId(Integer permissionId) {
            this.permissionId = permissionId;
        }
    }
}
