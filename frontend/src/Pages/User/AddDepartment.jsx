import React, { useState, useEffect } from "react";
import {
    getAllDepartments,
    createDepartment,
    deleteDepartment,
    updateDepartment,
    getAllPermissions,
    getPermissionsByDepartmentId,
    assignPermissionsToDepartment,
    removePermissionFromDepartment
} from "../../services/authService";
import { Modal, Button } from "react-bootstrap";

function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        departmentName: "",
    });
    const [editingDepartmentId, setEditingDepartmentId] = useState(null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [availablePermissions, setAvailablePermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [assignedPermissions, setAssignedPermissions] = useState([]);

    // Fetch all departments and permissions
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getAllDepartments();
                setDepartments(data);
            } catch (err) {
                console.error("Error fetching departments:", err);
                setError("Unable to fetch departments.");
            }
        };

        const fetchPermissions = async () => {
            try {
                const data = await getAllPermissions();
                setAvailablePermissions(data);
            } catch (err) {
                console.error("Error fetching permissions:", err);
                setError("Unable to fetch permissions.");
            }
        };

        fetchDepartments();
        fetchPermissions();
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle adding or updating department
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDepartmentId) {
                await updateDepartment(editingDepartmentId, formData);
                setSuccessMessage("Cập nhật phòng ban thành công!");
            } else {
                await createDepartment(formData);
                setSuccessMessage("Phòng ban mới đã được thêm vào!");
            }

            const data = await getAllDepartments();
            setDepartments(data);
            setFormData({ departmentName: "" });
            setEditingDepartmentId(null);
            setShowModal(false);
            setError("");
        } catch (err) {
            console.error("Error saving department:", err);
            setError("Failed to save department. Please try again.");
        }
    };

    // Handle delete department
    const handleDelete = async (id) => {
        try {
            await deleteDepartment(id);
            setSuccessMessage("Xóa thành công phòng ban!");
            const updatedDepartments = departments.filter(
                (dept) => dept.departmentId !== id
            );
            setDepartments(updatedDepartments);
        } catch (err) {
            console.error("Error deleting department:", err);
            setError("Unable to delete department.");
        }
    };

    // Handle edit department
    const handleEdit = (department) => {
        setFormData({ departmentName: department.departmentName });
        setEditingDepartmentId(department.departmentId);
        setShowModal(true);
    };

    // Handle open modal to assign permissions
    const handleAssignPermissions = async (departmentId) => {
        try {
            setSelectedDepartmentId(departmentId);
            const assignedPermissions = await getPermissionsByDepartmentId(departmentId);
            setAssignedPermissions(assignedPermissions.map((perm) => perm.permissionID));
            setSelectedPermissions(
                assignedPermissions.map((perm) => perm.permissionID)
            );
            setShowPermissionModal(true);
        } catch (err) {
            console.error("Error fetching assigned permissions:", err);
            setError("Unable to fetch assigned permissions.");
        }
    };
    
    

    const handlePermissionChange = async (e) => {
        const { value, checked } = e.target;
        const permissionId = parseInt(value);
    
        if (checked) {
            // Nếu quyền được chọn, thêm vào danh sách
            setSelectedPermissions((prev) => [...prev, permissionId]);
        } else {
            // Nếu quyền bị bỏ chọn, kiểm tra xem quyền đã được gán hay chưa
            setSelectedPermissions((prev) =>
                prev.filter((permId) => permId !== permissionId)
            );
    
            // Xóa quyền nếu đã được gán trước đó
            if (assignedPermissions.includes(permissionId)) {
                try {
                    await removePermissionFromDepartment(selectedDepartmentId, permissionId);
                    setSuccessMessage("Xóa quyền thành công.");
                } catch (err) {
                    console.error("Error removing permission:", err);
                    setError("Lỗi khi xóa quyền. Vui lòng thử lại.");
                }
            }
        }
    };
    
    

    // Handle assigning permissions to department
    const handleAssignPermissionsSubmit = async () => {
        try {
            if (!selectedDepartmentId) {
                throw new Error("Invalid departmentId");
            }
            await assignPermissionsToDepartment(selectedDepartmentId, selectedPermissions);
            setSuccessMessage("Gán quyền thành công!");
            setShowPermissionModal(false);
        } catch (err) {
            console.error("Error assigning permissions:", err);
            setError("Failed to assign permissions. Please try again.");
        }
    };

    // Close modal for adding/editing department
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ departmentName: "" });
        setEditingDepartmentId(null);
    };

    // Close permission modal
    const handleClosePermissionModal = () => {
        setShowPermissionModal(false);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Danh Sách Phòng Ban</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <Button variant="primary" onClick={() => setShowModal(true)} className="mb-4">
                Thêm Phòng Ban
            </Button>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Tên Phòng Ban</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department) => (
                            <tr key={department.departmentId}>
                                <td>{department.departmentId}</td>
                                <td>{department.departmentName}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(department)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => handleDelete(department.departmentId)}
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => handleAssignPermissions(department.departmentId)}
                                    >
                                        Gán Quyền
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingDepartmentId ? "Cập Nhật Phòng Ban" : "Thêm Phòng Ban"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="departmentName" className="form-label">
                                Tên Phòng Ban
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="departmentName"
                                name="departmentName"
                                value={formData.departmentName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            {editingDepartmentId ? "Cập Nhật" : "Thêm"}
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModal} className="ms-2">
                            Hủy
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showPermissionModal} onHide={handleClosePermissionModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Gán Quyền</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {availablePermissions.map((permission) => (
                        <div className="form-check" key={permission.permissionID}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={permission.permissionID}
                                checked={selectedPermissions.includes(permission.permissionID)}
                                onChange={handlePermissionChange}
                            />
                            <label className="form-check-label">
                                {permission.name}
                            </label>
                        </div>
                    ))}
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePermissionModal}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleAssignPermissionsSubmit}>
                        Gán Quyền
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DepartmentList;
