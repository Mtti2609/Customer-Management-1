package com.API.API.repository;

import com.API.API.model.Department;
import com.API.API.model.Permission;
import com.API.API.model.DepartmentPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentPermissionRepository extends JpaRepository<DepartmentPermission, Integer> {

    // Kiểm tra nếu quyền đã tồn tại cho phòng ban
    boolean existsByDepartmentAndPermission(Department department, Permission permission);

    // Tìm quyền theo phòng ban và quyền cụ thể
    Optional<DepartmentPermission> findByDepartmentAndPermission(Department department, Permission permission);

    // Lấy tất cả các quyền đã gán cho phòng ban
    List<DepartmentPermission> findAllByDepartment(Department department);

    // Truy vấn tùy chỉnh nếu cần thiết
    @Query("SELECT dp FROM DepartmentPermission dp WHERE dp.department.departmentId = :departmentId")
    List<DepartmentPermission> findByDepartmentId(@Param("departmentId") Integer departmentId);
}
