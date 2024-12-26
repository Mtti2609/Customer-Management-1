import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser, getAllDepartments } from "../../services/authService";

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        role: "",
        department: { departmentId: null }, // Định dạng đúng cho backend
    });

    const [departments, setDepartments] = useState([]); // Danh sách phòng ban
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserById(id); // Lấy thông tin người dùng
                setFormData({
                    ...user,
                    department: { departmentId: user.department?.departmentId || null },
                });
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Unable to fetch user details.");
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await getAllDepartments(); // Lấy danh sách phòng ban
                setDepartments(response);
            } catch (err) {
                console.error("Error fetching departments:", err);
                setError("Unable to fetch departments.");
            }
        };

        fetchUserData();
        fetchDepartments();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "departmentId") {
            // Cập nhật departmentId trong formData.department
            setFormData({
                ...formData,
                department: { departmentId: parseInt(value) },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kiểm tra trường rỗng
            if (!formData.username || !formData.fullName || !formData.email || !formData.role) {
                setError("Please fill out all required fields.");
                return;
            }

            console.log("FormData trước khi gửi:", formData); // Debug dữ liệu trước khi gửi

            await updateUser(id, formData); // Gửi formData
            setSuccessMessage("User updated successfully!");
            setError("");
            setTimeout(() => {
                navigate("/user");
            }, 2000);
        } catch (err) {
            console.error("Error updating user details:", err);
            setError("Unable to update user details.");
        }
    };

    return (
        <div className="container mt-4">
            <h1>Edit User</h1>

            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select
                        className="form-select"
                        name="departmentId"
                        value={formData.department.departmentId || ""}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((department) => (
                            <option key={department.departmentId} value={department.departmentId}>
                                {department.departmentName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Update User</button>
            </form>
        </div>
    );
}

export default EditUser;
