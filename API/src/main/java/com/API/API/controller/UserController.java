package com.API.API.controller;

import com.API.API.dto.LoginRequest;
import com.API.API.dto.LoginResponse;
import com.API.API.model.Department;
import com.API.API.model.User;
import com.API.API.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // POST: /api/users/login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (user.isPresent()) {
            User loggedInUser = user.get();
            return ResponseEntity.ok(new LoginResponse(
                    "Login successful!",
                    true,
                    loggedInUser.getUserId(),
                    loggedInUser.getUsername(),
                    loggedInUser.getRole().toString()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(
                    "Invalid username or password",
                    false,
                    null,
                    null,
                    null
            ));
        }
    }

    // GET: /api/users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // GET: /api/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // POST: /api/users
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            // Kiểm tra nếu `departmentId` được cung cấp
            if (user.getDepartment() != null && user.getDepartment().getDepartmentId() != null) {
                Department department = new Department();
                department.setDepartmentId(user.getDepartment().getDepartmentId());
                user.setDepartment(department);
            }

            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating user: " + e.getMessage());
        }
    }

    // PUT: /api/users/{id}
    // PUT: /api/users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Integer id,
            @RequestBody User user) { // Thay vì dùng MultipartFile, nhận dữ liệu User qua @RequestBody
        try {
            // Cập nhật User
            User updatedUser = userService.updateUser(id, user); // Gọi hàm updateUser không có MultipartFile
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating user: " + e.getMessage());
        }
    }



    // DELETE: /api/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
