import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../services/authService";
import { getAllDepartments } from "../../services/authService";

function EditUser() {
    const { id } = useParams(); // Lấy ID user từ URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        role: "",
        departmentId: null, // Thêm trường departmentId
    });
    const [departments, setDepartments] = useState([]); // Danh sách các phòng ban
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Lấy thông tin user và phòng ban
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUserById(id); // Fetch thông tin user
                setFormData({
                    username: user.username,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    departmentId: user.department?.departmentId || null, // Kiểm tra xem user có phòng ban không
                });

                const departmentsData = await getAllDepartments(); // Fetch danh sách phòng ban
                setDepartments(departmentsData);
            } catch (err) {
                console.error("Error fetching user or departments:", err);
                setError("Unable to fetch user or department data.");
            }
        };
        fetchData();
    }, [id]);

    // Xử lý khi input thay đổi
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Xử lý khi chọn phòng ban
    const handleDepartmentChange = (e) => {
        setFormData({ ...formData, departmentId: parseInt(e.target.value) });
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, formData); // Gửi API cập nhật user
            setSuccessMessage("User updated successfully!");
            setError("");

            // Chuyển hướng về trang danh sách user sau 2 giây
            setTimeout(() => {
                navigate("/user");
            }, 2000);
        } catch (err) {
            console.error("Error updating user:", err);
            setError("Unable to update user details.");
        }
    };

    return (
        <div className="container mt-4">
            <h1>Edit User</h1>

            {/* Hiển thị thông báo thành công */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Hiển thị lỗi */}
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
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>

                {/* Dropdown chọn phòng ban */}
                <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select
                        className="form-select"
                        value={formData.departmentId || ""}
                        onChange={handleDepartmentChange}
                    >
                        <option value="">No Department</option>
                        {departments.map((dept) => (
                            <option key={dept.departmentId} value={dept.departmentId}>
                                {dept.departmentName}
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
