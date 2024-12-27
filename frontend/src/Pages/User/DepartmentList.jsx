import React, { useState, useEffect } from "react";
import {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    assignPermissionsToDepartment,
    getAllPermissions,
} from "../../services/authService";

function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const [newDepartmentName, setNewDepartmentName] = useState("");
    const [editDepartment, setEditDepartment] = useState(null);
    const [editDepartmentName, setEditDepartmentName] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    // Fetch departments and permissions
    useEffect(() => {
        const fetchData = async () => {
            try {
                const deptData = await getAllDepartments();
                const permData = await getAllPermissions();
                setDepartments(deptData);
                setPermissions(permData);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    // Fetch assigned permissions for a department
    const fetchAssignedPermissions = async (departmentId) => {
        try {
            const response = await fetch(`/api/permissions/${departmentId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.map(permission => permission.permissionId); // Trả về danh sách ID quyền
        } catch (err) {
            console.error("Error fetching assigned permissions:", err);
            return [];
        }
    };
    

    // Handle opening "Assign Permissions" modal
    const openAssignPermissionsModal = async (dept) => {
        setEditDepartment(dept);
        const assignedPermissions = await fetchAssignedPermissions(dept.departmentId);
        setSelectedPermissions(assignedPermissions); // Cập nhật quyền đã gán
    };

    // Handle adding a department
    const handleAddDepartment = async () => {
        if (!newDepartmentName) {
            alert("Tên phòng ban không được để trống.");
            return;
        }
        try {
            const newDepartment = await createDepartment({ departmentName: newDepartmentName });
            setDepartments([...departments, newDepartment]);
            setNewDepartmentName("");
            alert("Thêm phòng ban thành công!");
        } catch (err) {
            console.error("Error adding department:", err);
            alert("Thêm phòng ban thất bại.");
        }
    };

    // Handle editing a department
    const handleEditDepartment = async () => {
        if (!editDepartmentName) {
            alert("Tên phòng ban không được để trống.");
            return;
        }
        try {
            const updatedDept = await updateDepartment(editDepartment.departmentId, {
                departmentName: editDepartmentName,
            });
            setDepartments(
                departments.map((dept) =>
                    dept.departmentId === updatedDept.departmentId ? updatedDept : dept
                )
            );
            setEditDepartment(null);
            alert("Cập nhật phòng ban thành công!");
        } catch (err) {
            console.error("Error updating department:", err);
            alert("Cập nhật phòng ban thất bại.");
        }
    };

    // Handle deleting a department
    const handleDeleteDepartment = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa phòng ban này?")) return;
        try {
            await deleteDepartment(id);
            setDepartments(departments.filter((dept) => dept.departmentId !== id));
            alert("Xóa phòng ban thành công!");
        } catch (err) {
            console.error("Error deleting department:", err);
            alert("Xóa phòng ban thất bại.");
        }
    };

    // Handle assigning permissions
    const handleAssignPermissions = async () => {
        try {
            await assignPermissionsToDepartment(editDepartment.departmentId, selectedPermissions);
            alert("Gán quyền thành công!");
            setEditDepartment(null);
        } catch (err) {
            console.error("Error assigning permissions:", err.response?.data || err.message);
            alert(`Error: ${err.response?.data || err.message}`);
        }
    };

    return (
        <div className="container">
            <h1>Danh sách phòng ban</h1>

            {/* Add Department Button */}
            <button
                className="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#addDepartmentModal"
            >
                Thêm phòng ban
            </button>

            {/* Department Table */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên phòng ban</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept) => (
                        <tr key={dept.departmentId}>
                            <td>{dept.departmentId}</td>
                            <td>{dept.departmentName}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => {
                                        setEditDepartment(dept);
                                        setEditDepartmentName(dept.departmentName);
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#editDepartmentModal"
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn btn-danger btn-sm me-2"
                                    onClick={() => handleDeleteDepartment(dept.departmentId)}
                                >
                                    Xóa
                                </button>
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => openAssignPermissionsModal(dept)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#assignPermissionsModal"
                                >
                                    Gán quyền
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Department Modal */}
            <div className="modal fade" id="addDepartmentModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm phòng ban</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên phòng ban"
                                value={newDepartmentName}
                                onChange={(e) => setNewDepartmentName(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy
                            </button>
                            <button className="btn btn-primary" onClick={handleAddDepartment}>
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Department Modal */}
            {editDepartment && (
                <div className="modal fade" id="editDepartmentModal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sửa phòng ban</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editDepartmentName}
                                    onChange={(e) => setEditDepartmentName(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-bs-dismiss="modal">
                                    Hủy
                                </button>
                                <button className="btn btn-warning" onClick={handleEditDepartment}>
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Permissions Modal */}
            {editDepartment && (
                <div className="modal fade" id="assignPermissionsModal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Gán quyền cho phòng ban</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                {permissions.map((perm) => (
                                    <div key={perm.permissionID} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`perm-${perm.permissionID}`}
                                            value={perm.permissionID}
                                            checked={selectedPermissions.includes(perm.permissionID)}
                                            onChange={(e) => {
                                                const id = parseInt(e.target.value, 10);
                                                setSelectedPermissions((prev) =>
                                                    e.target.checked
                                                        ? [...prev, id]
                                                        : prev.filter((permId) => permId !== id)
                                                );
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor={`perm-${perm.permissionID}`}>
                                            {perm.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-bs-dismiss="modal">
                                    Hủy
                                </button>
                                <button className="btn btn-primary" onClick={handleAssignPermissions}>
                                    Gán quyền
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DepartmentList;
