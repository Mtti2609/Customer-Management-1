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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
            return ResponseEntity.status(401).body(new LoginResponse(
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
            // Kiểm tra nếu `departmentId` không null
            if (user.getDepartment() != null && user.getDepartment().getDepartmentId() != null) {
                Department department = new Department();
                department.setDepartmentId(user.getDepartment().getDepartmentId());
                user.setDepartment(department);
            }

            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating user: " + e.getMessage());
        }
    }


    // PUT: /api/users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id,
                                        @RequestParam(value = "file", required = false) MultipartFile file,
                                        @RequestParam("username") String username,
                                        @RequestParam("fullName") String fullName,
                                        @RequestParam("email") String email,
                                        @RequestParam("role") String role,
                                        @RequestParam(value = "departmentId", required = false) Integer departmentId) {
        try {
            User updatedUser = new User();
            updatedUser.setUsername(username);
            updatedUser.setFullName(fullName);
            updatedUser.setEmail(email);
            updatedUser.setRole(User.Role.valueOf(role));

            // Cập nhật Department nếu có
            if (departmentId != null) {
                Department department = new Department();
                department.setDepartmentId(departmentId);
                updatedUser.setDepartment(department);
            }

            User savedUser = userService.updateUser(id, updatedUser, file);
            return ResponseEntity.ok(savedUser);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating user: " + e.getMessage());
        }
    }

    // DELETE: /api/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}