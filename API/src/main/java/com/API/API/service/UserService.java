package com.API.API.service;

import com.API.API.config.FileUtils;
import com.API.API.model.Department;
import com.API.API.model.User;
import com.API.API.repository.DepartmentRepository;
import com.API.API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Formatter;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    // Hàm mã hóa mật khẩu bằng SHA-256
    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = digest.digest(password.getBytes(StandardCharsets.UTF_8));

            // Chuyển đổi byte[] thành chuỗi Hexadecimal
            try (Formatter formatter = new Formatter()) {
                for (byte b : hashedBytes) {
                    formatter.format("%02x", b);
                }
                return formatter.toString();
            }
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error while hashing password", e);
        }
    }

    // Lấy tất cả User
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy User theo ID
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    // Tạo mới User
    public User createUser(User user) {
        if (user.getDepartment() != null && user.getDepartment().getDepartmentId() != null) {
            // Lấy department từ database
            Department department = departmentRepository.findById(user.getDepartment().getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            user.setDepartment(department);
        } else {
            user.setDepartment(null);
        }

        // Mã hóa mật khẩu trước khi lưu vào database
        user.setPassword(hashPassword(user.getPassword()));

        return userRepository.save(user);
    }

    // Cập nhật User
    public User updateUser(Integer id, User updatedUser, MultipartFile file) throws IOException {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setFullName(updatedUser.getFullName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(hashPassword(updatedUser.getPassword()));  // Mã hóa lại mật khẩu khi cập nhật
            user.setRole(updatedUser.getRole());

            // Cập nhật department nếu có
            if (updatedUser.getDepartment() != null) {
                Optional<Department> department = departmentRepository.findById(updatedUser.getDepartment().getDepartmentId());
                department.ifPresent(user::setDepartment);
            }

            // Nếu có file avatar thì cập nhật
            if (file != null && !file.isEmpty()) {
                try {
                    String avatarUrl = FileUtils.saveAvatar(file);
                    user.setAvatar(avatarUrl);
                } catch (IOException e) {
                    throw new RuntimeException("Error saving avatar", e);
                }
            }

            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Xóa User
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    // Đăng nhập User
    public Optional<User> login(String username, String password) {
        // Mã hóa mật khẩu người dùng nhập vào
        String hashedPassword = hashPassword(password);

        // So sánh với mật khẩu đã mã hóa trong cơ sở dữ liệu
        return userRepository.findByUsernameAndPassword(username, hashedPassword);
    }
}
