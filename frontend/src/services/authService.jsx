import axios from "axios";
import environments from "../constant/environment";

const API_BASE_URL = environments.apiBaseUrl;

// ------------------- USER MANAGEMENT -------------------

// Đăng nhập
export const login = async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
    return response.data; // Ensure response contains user data
};

// Lấy danh sách tất cả người dùng
export const getAllUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

// Tạo người dùng mới
export const createUser = async (user) => {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
};

// Cập nhật người dùng
export const updateUser = async (id, formData) => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// Xóa người dùng
export const deleteUser = async (id) => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
};

// ------------------- PERMISSIONS MANAGEMENT -------------------

// Lấy tất cả quyền
export const getAllPermissions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/permissions/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching permissions:", error);
        throw error;
    }
};

// Lấy quyền theo User ID
export const getPermissionsByUserId = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/permissions/${userId}`);
    return response.data;
};

// Gán quyền cho người dùng
export const assignPermissionToUser = async (userId, permissionIds) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user-permissions/assign`, {
            userId,
            permissionIds,
        });
        return response.data;
    } catch (error) {
        console.error("Error assigning permissions to user:", error);
        throw error;
    }
};

// Xóa quyền của người dùng
export const removePermissionFromUser = async (userId, permissionId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/user-permissions/remove`, {
            data: { userId, permissionId },
        });
        return response.data;
    } catch (error) {
        console.error("Error removing permission from user:", error);
        throw error;
    }
};

// ------------------- DEPARTMENT MANAGEMENT -------------------

// Lấy danh sách tất cả phòng ban
export const getAllDepartments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/departments`);
        return response.data;
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
    }
};

// Tạo phòng ban mới
export const createDepartment = async (department) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/departments`, department);
        return response.data;
    } catch (error) {
        console.error("Error creating department:", error);
        throw error;
    }
};

// Cập nhật thông tin phòng ban
export const updateDepartment = async (id, department) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/departments/${id}`, department);
        return response.data;
    } catch (error) {
        console.error("Error updating department:", error);
        throw error;
    }
};

// Xóa phòng ban
export const deleteDepartment = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/departments/${id}`);
    } catch (error) {
        console.error("Error deleting department:", error);
        throw error;
    }
};

// Gán quyền cho phòng ban
export const assignPermissionsToDepartment = async (departmentId, permissionIds) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/department-permissions/assign`, {
            departmentId,
            permissionIds,
        });
        return response.data;
    } catch (error) {
        console.error("Error assigning permissions:", error.response?.data || error.message);
        throw error;
    }
};

