package com.API.API.repository;

import com.API.API.model.Permission;
import com.API.API.model.User;
import com.API.API.model.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPermissionRepository extends JpaRepository<UserPermission, Integer> {

    // Kiểm tra quyền đã được gán cho user
    boolean existsByUserAndPermission(User user, Permission permission);
}
