import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getAllDepartments } from "../../services/authService";

function AddUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        role: "",
        password: "",
        department: { departmentId: null }, // Định dạng đúng cho backend
    });

    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getAllDepartments(); // Lấy danh sách phòng ban
                setDepartments(response);
            } catch (err) {
                console.error("Error fetching departments:", err);
                setError("Unable to fetch departments.");
            }
        };

        fetchDepartments();
    }, []);

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
            if (!formData.username || !formData.fullName || !formData.email || !formData.role || !formData.password) {
                setError("Please fill out all required fields.");
                return;
            }

            console.log("FormData trước khi gửi:", formData); // Debug dữ liệu trước khi gửi

            await createUser(formData); // Gửi formData
            setSuccessMessage("User added successfully!");
            setError("");
            setTimeout(() => {
                navigate("/user"); // Điều hướng về danh sách user
            }, 2000);
        } catch (err) {
            console.error("Error adding user:", err);
            setError("Unable to add user.");
        }
    };

    return (
        <div className="container mt-4">
            <h1>Add User</h1>

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
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;
