package com.API.API.repository;

import com.API.API.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Integer> {

    // Sửa lại tên phương thức và truy vấn cho đúng với phòng ban (Department)
    @Query("SELECT p FROM Permission p JOIN DepartmentPermission dp ON p.permissionID = dp.permission.permissionID WHERE dp.department.departmentId = :departmentId")
    List<Permission> findPermissionsByDepartmentId(@Param("departmentId") Integer departmentId);
}
