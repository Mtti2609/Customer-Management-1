import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/authService"; // Bỏ gán quyền từ import
import { PATHS } from "../../constant/pathnames";

function AddUser() {
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        role: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle input changes for user fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit form to create a new user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create user
            const newUser = await createUser(formData);

            setMessage("User added successfully!");
            setError("");
            setTimeout(() => {
                navigate(PATHS.USER);
            }, 1000);
        } catch (err) {
            console.error("Error adding user:", err);
            setError("Failed to add user. Please try again.");
            setMessage("");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Add User</h1>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        className="form-select"
                        id="role"
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
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
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
