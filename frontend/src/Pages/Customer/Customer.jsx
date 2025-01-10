import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../constant/pathnames";
import { getAllCustomers, deleteCustomer } from "../../services/customerServices";

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [classificationFilter, setClassificationFilter] = useState("");
    const [phoneFilter, setPhoneFilter] = useState("");
    const [addressFilter, setAddressFilter] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [customerToDelete, setCustomerToDelete] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    // Sort states
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    // Fetch all customers
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getAllCustomers();
                setCustomers(data);
                setFilteredCustomers(data);
            } catch (err) {
                console.error("Error fetching customers:", err);
                setError("Không thể tải dữ liệu khách hàng.");
            }
        };

        fetchCustomers();
    }, []);

    // Apply search, classification, phone, address filter, and sorting
    useEffect(() => {
        let tempCustomers = [...customers];

        // Filter by classification
        if (classificationFilter) {
            tempCustomers = tempCustomers.filter(
                (customer) =>
                    customer.classification?.classificationName === classificationFilter
            );
        }

        // Filter by phone
        if (phoneFilter) {
            tempCustomers = tempCustomers.filter((customer) =>
                customer.phone?.includes(phoneFilter)
            );
        }

        // Filter by address
        if (addressFilter) {
            tempCustomers = tempCustomers.filter((customer) =>
                customer.address?.toLowerCase().includes(addressFilter.toLowerCase())
            );
        }

        // Filter by search term
        if (searchTerm) {
            tempCustomers = tempCustomers.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort customers
        if (sortColumn) {
            tempCustomers.sort((a, b) => {
                let aValue = a[sortColumn] || "";
                let bValue = b[sortColumn] || "";

                // Handle nested properties if any
                if (sortColumn.includes('.')) {
                    const keys = sortColumn.split('.');
                    aValue = a;
                    bValue = b;
                    keys.forEach(key => {
                        aValue = aValue ? aValue[key] : '';
                        bValue = bValue ? bValue[key] : '';
                    });
                }

                // Ensure case-insensitive comparison for strings
                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                }
                if (typeof bValue === 'string') {
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) {
                    return sortOrder === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortOrder === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredCustomers(tempCustomers);
        setCurrentPage(1);
    }, [searchTerm, classificationFilter, phoneFilter, addressFilter, customers, sortColumn, sortOrder]);

    // Handle delete customer
    const confirmDelete = (customerId) => {
        setCustomerToDelete(customerId);
    };

    const handleDelete = async () => {
        try {
            await deleteCustomer(customerToDelete);
            setCustomers(
                customers.filter((customer) => customer.customerId !== customerToDelete)
            );
            setSuccessMessage("Khách hàng đã được xóa thành công!");
            setCustomerToDelete(null);
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            console.error("Error deleting customer:", err);
            setError("Không thể xóa khách hàng.");
        }
    };

    // Handle sort
    const handleSort = (column) => {
        if (sortColumn === column) {
            // Toggle sort order if the same column is clicked
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Set new sort column and default to ascending
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    // Pagination logic
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(
        indexOfFirstCustomer,
        indexOfLastCustomer
    );

    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (customers.length === 0) {
        return (
            <div className="alert alert-warning">
                Không có khách hàng nào được tìm thấy.
            </div>
        );
    }

    return (
        <div className="container">
            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">
                    <i className="bi bi-people-fill me-2"></i>Danh sách khách hàng
                </h1>
                <NavLink to={PATHS.ADD_CUSTOMER} className="btn btn-primary">
                    Thêm khách hàng
                </NavLink>
            </div>

            {/* Search and Filter */}
            <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm theo tên hoặc email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm theo số điện thoại..."
                    value={phoneFilter}
                    onChange={(e) => setPhoneFilter(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm theo địa chỉ..."
                    value={addressFilter}
                    onChange={(e) => setAddressFilter(e.target.value)}
                />
                <select
                    className="form-select"
                    value={classificationFilter}
                    onChange={(e) => setClassificationFilter(e.target.value)}
                >
                    <option value="">Tất cả phân loại</option>
                    <option value="VIP">VIP</option>
                    <option value="Normal">Normal</option>
                    <option value="Potential">Potential</option>
                </select>
            </div>

            {/* Customer Table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th onClick={() => handleSort("customerId")} style={{ cursor: "pointer" }}>
                                ID {sortColumn === "customerId" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                                Tên {sortColumn === "name" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                                Email {sortColumn === "email" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th onClick={() => handleSort("phone")} style={{ cursor: "pointer" }}>
                                Điện thoại {sortColumn === "phone" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th onClick={() => handleSort("address")} style={{ cursor: "pointer" }}>
                                Địa chỉ {sortColumn === "address" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th onClick={() => handleSort("classification.classificationName")} style={{ cursor: "pointer" }}>
                                Phân loại {sortColumn === "classification.classificationName" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCustomers.length > 0 ? (
                            currentCustomers.map((customer) => (
                                <tr key={customer.customerId}>
                                    <td>{customer.customerId}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.classification?.classificationName}</td>
                                    <td>
                                        <NavLink
                                            to={`${PATHS.EDIT_CUSTOMER}/${customer.customerId}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Sửa
                                        </NavLink>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => confirmDelete(customer.customerId)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Không tìm thấy khách hàng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {customerToDelete && (
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
                                    onClick={() => setCustomerToDelete(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa khách hàng này?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setCustomerToDelete(null)}
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

export default Customer;
