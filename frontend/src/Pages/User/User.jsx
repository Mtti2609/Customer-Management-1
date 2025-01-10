import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../services/authService";
import { PATHS } from "../../constant/pathnames";

function User() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState(""); // Bộ lọc phòng ban
    const [departments, setDepartments] = useState([]); // Danh sách các phòng ban
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [userToDelete, setUserToDelete] = useState(null);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10; // Số lượng user trên mỗi trang

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
                setFilteredUsers(data);

                // Lấy danh sách phòng ban duy nhất từ dữ liệu users
                const uniqueDepartments = [
                    ...new Set(
                        data
                            .map((user) => user.department?.departmentName)
                            .filter((name) => name) // Loại bỏ giá trị null/undefined
                    ),
                ];
                setDepartments(uniqueDepartments);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Không thể tải danh sách người dùng.");
            }
        };

        fetchUsers();
    }, []);

    // Apply search, role filter, department filter, and sort
    useEffect(() => {
        let tempUsers = [...users];

        // Lọc theo vai trò
        if (roleFilter) {
            tempUsers = tempUsers.filter((user) => user.role === roleFilter);
        }

        // Lọc theo bộ phận
        if (departmentFilter) {
            tempUsers = tempUsers.filter(
                (user) =>
                    user.department?.departmentName.toLowerCase() ===
                    departmentFilter.toLowerCase()
            );
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchTerm) {
            tempUsers = tempUsers.filter(
                (user) =>
                    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (user.phoneNumber && user.phoneNumber.includes(searchTerm))
            );
        }

        // Sắp xếp
        if (sortConfig.key) {
            tempUsers.sort((a, b) => {
                let aValue = a[sortConfig.key] || "";
                let bValue = b[sortConfig.key] || "";

                // Xử lý các thuộc tính lồng nhau (ví dụ: department.departmentName)
                if (sortConfig.key.includes('.')) {
                    const keys = sortConfig.key.split('.');
                    aValue = a;
                    bValue = b;
                    keys.forEach(key => {
                        aValue = aValue ? aValue[key] : '';
                        bValue = bValue ? bValue[key] : '';
                    });
                }

                // Đảm bảo so sánh không phân biệt hoa thường cho chuỗi
                if (typeof aValue === "string") {
                    aValue = aValue.toLowerCase();
                }
                if (typeof bValue === "string") {
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredUsers(tempUsers);
        setCurrentPage(1); // Reset trang về 1 khi áp dụng filter/sort
    }, [searchTerm, roleFilter, departmentFilter, users, sortConfig]);

    // Handle delete user
    const confirmDelete = (userId) => {
        setUserToDelete(userId);
    };

    const handleDelete = async () => {
        try {
            await deleteUser(userToDelete);
            setUsers(users.filter((user) => user.userId !== userToDelete));
            setSuccessMessage("Xóa người dùng thành công!");
            setUserToDelete(null);
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            console.error("Error deleting user:", err);
            setError("Không thể xóa người dùng.");
        }
    };

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleSort = (key) => {
        setSortConfig((prevSort) => ({
            key,
            direction: prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleViewDepartments = () => {
        navigate(PATHS.DEPARTMENTS);
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (users.length === 0) {
        return (
            <div className="alert alert-warning">
                Không có người dùng nào được tìm thấy.
            </div>
        );
    }

    return (
        <div className="container">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">
                    <i className="bi bi-person-circle"></i> Danh sách User
                </h1>
                <div>
                    <NavLink to={PATHS.ADD_USER} className="btn btn-primary me-2">
                        Thêm User
                    </NavLink>
                    <button className="btn btn-secondary" onClick={handleViewDepartments}>
                        Xem danh sách phòng ban
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="d-flex gap-3 mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="form-select"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="">Tất cả vai trò</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                </select>
                <select
                    className="form-select"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                    <option value="">Tất cả bộ phận</option>
                    {departments.map((department) => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
            </div>

            {/* User Table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th onClick={() => handleSort("userId")} style={{ cursor: "pointer" }}>
                                ID {sortConfig.key === "userId" && (
                                    sortConfig.direction === "asc" ? " ▲" : " ▼"
                                )}
                            </th>
                            <th onClick={() => handleSort("username")} style={{ cursor: "pointer" }}>
                                Username {sortConfig.key === "username" && (
                                    sortConfig.direction === "asc" ? " ▲" : " ▼"
                                )}
                            </th>
                            <th onClick={() => handleSort("fullName")} style={{ cursor: "pointer" }}>
                                Full Name {sortConfig.key === "fullName" && (
                                    sortConfig.direction === "asc" ? " ▲" : " ▼"
                                )}
                            </th>
                            <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                                Email {sortConfig.key === "email" && (
                                    sortConfig.direction === "asc" ? " ▲" : " ▼"
                                )}
                            </th>
                            <th onClick={() => handleSort("role")} style={{ cursor: "pointer" }}>
                                Vai trò {sortConfig.key === "role" && (
                                    sortConfig.direction === "asc" ? " ▲" : " ▼"
                                )}
                            </th>
                            <th onClick={() => handleSort("department.departmentName")} style={{ cursor: "pointer" }}>
                                Bộ phận {sortConfig.key === "department.departmentName" && (
                                    sortConfig.direction === "asc" ? " ▲" : " ▼"
                                )}
                            </th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user) => (
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.username}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.department?.departmentName || "Chưa gán"}</td>
                                    <td>
                                        <NavLink
                                            to={`${PATHS.EDIT_USER}/${user.userId}`}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Sửa
                                        </NavLink>
                                        <button
                                            className="btn btn-danger btn-sm ms-2"
                                            onClick={() => confirmDelete(user.userId)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Không tìm thấy người dùng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Trang {currentPage} trên {totalPages}
                </span>
                <button
                    className="btn btn-secondary"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {userToDelete && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xác nhận xóa</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setUserToDelete(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setUserToDelete(null)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
