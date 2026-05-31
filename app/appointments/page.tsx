"use client";
import React, { useEffect } from 'react';
import { COLORS } from '@/lib/constants';
import '@/styles/appointments.css';
import axios from 'axios';

interface Appointment {
    appointmentId: string;
    name: string;
    issueSummary: string;
    environment: string;
    urgencyLevel: 'Low' | 'Medium' | 'High';
    serviceType: string;
    serviceCategory: string;
    detailedDescription: string;
    serviceAddress: string;
    preferredDate: string;
    preferredTime: string;
}

const ENVIRONMENTS = [
    'Kitchen', 'Bathroom', 'Bedroom', 'Living Room', 'Garage', 'Garden', 'Basement', 'Attic', 'Office', 'Other'
];

const REPAIR_SERVICES = [
    { id: 'mechanic', name: 'Vehicle Mechanic' },
    { id: 'plumber', name: 'Plumber' },
    { id: 'electrician', name: 'Electrician' },
    { id: 'carpenter', name: 'Carpenter' },
    { id: 'hvac', name: 'HVAC Technician' },
    { id: 'painter', name: 'Painter' },
    { id: 'mason', name: 'Mason' },
    { id: 'appliance', name: 'Appliance Technician' },
    { id: 'pest', name: 'Pest Control' },
];

const NEW_CONSTRUCTION_SERVICES = [
    { id: 'plumber', name: 'Plumber' },
    { id: 'carpenter', name: 'Carpenter' },
    { id: 'painter', name: 'Painter' },
    { id: 'mason', name: 'Mason' },
];

const TIME_OPTIONS = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
];

export default function Appointments() {
    const [appointments, setAppointments] = React.useState<any[]>([]);
    const [isAppointmentDeleted, setIsAppointmentDeleted] = React.useState(false);
    const [isAppointmentUpdated, setIsAppointmentUpdated] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [editForm, setEditForm] = React.useState<Appointment | null>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);

    useEffect(() => {
        getAppointments();
    }, [isAppointmentDeleted, isAppointmentUpdated])

    const getAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:5213/Appointment');
            const data = await response.data;
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    const [categories, setCategories] = React.useState([
        { name: "All", count: 156, active: true },
        { name: "Plumber", count: 45, active: false },
        { name: "Electrician", count: 32, active: false },
        { name: "Carpenter", count: 28, active: false },
        { name: "Painter", count: 24, active: false },
        { name: "HVAC", count: 15, active: false },
        { name: "Mason", count: 12, active: false }
    ]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Low': return COLORS.success;
            case 'Medium': return COLORS.warning;
            case 'High': return COLORS.danger;
            default: return COLORS.accent;
        }
    };

    const handleCategoryClick = (name: string) => {
        setCategories(prev => prev.map(cat => ({
            ...cat, active: cat.name === name
        })))
    };

    const formatPreferredDate = (dateValue?: string) => {
        if (!dateValue) return "Date not selected";

        const parsed = new Date(dateValue);
        if (Number.isNaN(parsed.getTime())) {
            return dateValue;
        }

        return parsed.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const handleAppointmentCancel = (id: string) =>{
        console.log("id",id);
        const response = axios.delete(`http://localhost:5213/Appointment/delete?appointmentId=${id}`);
        setIsAppointmentDeleted(true);
    }

    const formatDateForInput = (dateValue?: string) => {
        if (!dateValue) return "";

        const parsed = new Date(dateValue);
        if (Number.isNaN(parsed.getTime())) {
            return dateValue.split("T")[0] || "";
        }

        return parsed.toISOString().split("T")[0];
    };

    const openEditModal = (appointment: any) => {
        setEditForm({
            appointmentId: appointment.appointmentId,
            name: appointment.name || "",
            issueSummary: appointment.issueSummary || "",
            environment: appointment.environment || "",
            urgencyLevel: appointment.urgencyLevel || "Medium",
            serviceType: appointment.serviceType || "",
            serviceCategory: appointment.serviceCategory || "",
            detailedDescription: appointment.detailedDescription || "",
            serviceAddress: appointment.serviceAddress || "",
            preferredDate: formatDateForInput(appointment.preferredDate),
            preferredTime: appointment.preferredTime || "",
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditForm(null);
    };

    const handleEditFieldChange = (field: keyof Appointment, value: string) => {
        setEditForm(prev => prev ? { ...prev, [field]: value } : prev);
    };

    const handleEditServiceTypeChange = (type: string) => {
        setEditForm(prev => prev ? { ...prev, serviceType: type, serviceCategory: "" } : prev);
    };

    const getEditServiceOptions = () => {
        if (editForm?.serviceType === "new") return NEW_CONSTRUCTION_SERVICES;
        return REPAIR_SERVICES;
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editForm) return;

        setIsUpdating(true);
        try {
            await axios.put("http://localhost:5213/Appointment/update", editForm, {
                headers: { "Content-Type": "application/json" },
            });
            closeEditModal();
            setIsAppointmentUpdated(prev => !prev);
        } catch (error) {
            console.error("Error updating appointment:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="appointments-container">
            {/* Header Section */}
            <div className="appointments-header">
                <div className="header-content">
                    <h1 className="appointments-title">Your Appointments</h1>
                    <p className="appointments-subtitle">
                        You can view and edit your appointments here!
                    </p>
                </div>
            </div>

            <div className="appointments-content">
                {/* Sidebar */}
                <div className="appointments-sidebar">
                    <div className="sidebar-section">
                        <h3 className="sidebar-title">Categories</h3>
                        <div className="category-filters">
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    className={`category-btn ${category.active ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(category.name)}
                                >
                                    {category.name}
                                    <span className="category-count">{category.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="appointments-main">
                    <div className="content-header">
                        <h2 className="content-title">Appointments</h2>
                        <div className="content-filters">
                            <select className="filter-select">
                                <option value="recent">Recent</option>
                                <option value="popular">Older</option>
                            </select>
                        </div>
                    </div>

                    <div className="posts-grid">
                        {appointments.map((item) => (
                            <div key={item.appointmentId} className="post-card">
                                <div className="post-content">
                                    <div className="post-top">
                                        <span className="appointment-category">{item.serviceCategory}</span>
                                        <span
                                            className="urgency-badge"
                                            style={{ backgroundColor: getDifficultyColor(item.urgencyLevel) }}
                                        >
                                            {item.urgencyLevel} Priority
                                        </span>
                                    </div>

                                    <h3 className="post-title">{item.issueSummary}</h3>
                                    <p className="post-subtitle">{item.serviceType}</p>
                                    <p className="post-description">{item.detailedDescription}</p>

                                    <div className="post-meta">
                                        <div className="post-stats">
                                            <span className="stat-chip">Environment: {item.environment}</span>
                                            <span className="stat-chip">Date: {formatPreferredDate(item.preferredDate)}</span>
                                            <span className="stat-chip">Time: {item.preferredTime}</span>
                                        </div>
                                    </div>

                                    <div className="post-footer">
                                        <div className="post-author">
                                            <span className="author-label">Service Address</span>
                                            <span className="author-name">{item.name}</span>
                                            <span className="author-name">{item.serviceAddress}</span>
                                        </div>
                                        <div className="post-actions">
                                            <button className="action-btn" onClick={() => openEditModal(item)}>Edit</button>
                                            <button className="action-btn" onClick={() => handleAppointmentCancel(item.appointmentId)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="load-more">
                        <button className="btn-secondary">Load More</button>
                    </div>
                </div>

            </div>

            {isEditModalOpen && editForm && (
                <div
                    className="modal-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="edit-appointment-title"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeEditModal();
                    }}
                >
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h2 id="edit-appointment-title" className="modal-title">Edit Appointment</h2>
                                <p className="modal-subtitle">Update your appointment details below.</p>
                            </div>
                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={closeEditModal}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="edit-appointment-form">
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label className="modal-form-label" htmlFor="edit-name">Your Name</label>
                                    <input
                                        id="edit-name"
                                        type="text"
                                        className="modal-form-input"
                                        value={editForm.name}
                                        onChange={(e) => handleEditFieldChange("name", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label className="modal-form-label" htmlFor="edit-issue">Issue Summary</label>
                                    <input
                                        id="edit-issue"
                                        type="text"
                                        className="modal-form-input"
                                        value={editForm.issueSummary}
                                        onChange={(e) => handleEditFieldChange("issueSummary", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label className="modal-form-label" htmlFor="edit-environment">Environment</label>
                                    <select
                                        id="edit-environment"
                                        className="modal-form-select"
                                        value={editForm.environment}
                                        onChange={(e) => handleEditFieldChange("environment", e.target.value)}
                                        required
                                    >
                                        <option value="">Select location</option>
                                        {ENVIRONMENTS.map(env => (
                                            <option key={env} value={env}>{env}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-form-group">
                                    <label className="modal-form-label">Urgency Level</label>
                                    <div className="modal-urgency-buttons">
                                        {(["Low", "Medium", "High"] as const).map(level => (
                                            <button
                                                key={level}
                                                type="button"
                                                className={`modal-urgency-btn ${editForm.urgencyLevel === level ? "active" : ""}`}
                                                style={{
                                                    backgroundColor: editForm.urgencyLevel === level
                                                        ? getDifficultyColor(level)
                                                        : "transparent",
                                                    borderColor: getDifficultyColor(level),
                                                    color: editForm.urgencyLevel === level ? "white" : getDifficultyColor(level),
                                                }}
                                                onClick={() => handleEditFieldChange("urgencyLevel", level)}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-form-group">
                                <label className="modal-form-label">Service Type</label>
                                <div className="modal-service-type-buttons">
                                    <button
                                        type="button"
                                        className={`modal-service-type-btn ${editForm.serviceType === "repair" ? "active" : ""}`}
                                        onClick={() => handleEditServiceTypeChange("repair")}
                                    >
                                        Repair Work
                                    </button>
                                    <button
                                        type="button"
                                        className={`modal-service-type-btn ${editForm.serviceType === "new" ? "active" : ""}`}
                                        onClick={() => handleEditServiceTypeChange("new")}
                                    >
                                        New Construction
                                    </button>
                                </div>
                            </div>

                            <div className="modal-form-group">
                                <label className="modal-form-label" htmlFor="edit-category">Service Category</label>
                                <select
                                    id="edit-category"
                                    className="modal-form-select"
                                    value={editForm.serviceCategory}
                                    onChange={(e) => handleEditFieldChange("serviceCategory", e.target.value)}
                                    required
                                >
                                    <option value="">Select category</option>
                                    {getEditServiceOptions().map(service => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="modal-form-group">
                                <label className="modal-form-label" htmlFor="edit-description">Detailed Description</label>
                                <textarea
                                    id="edit-description"
                                    className="modal-form-textarea"
                                    value={editForm.detailedDescription}
                                    onChange={(e) => handleEditFieldChange("detailedDescription", e.target.value)}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="modal-form-group">
                                <label className="modal-form-label" htmlFor="edit-address">Service Address</label>
                                <textarea
                                    id="edit-address"
                                    className="modal-form-textarea"
                                    value={editForm.serviceAddress}
                                    onChange={(e) => handleEditFieldChange("serviceAddress", e.target.value)}
                                    rows={2}
                                    required
                                />
                            </div>

                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label className="modal-form-label" htmlFor="edit-date">Preferred Date</label>
                                    <input
                                        id="edit-date"
                                        type="date"
                                        className="modal-form-input"
                                        value={editForm.preferredDate}
                                        onChange={(e) => handleEditFieldChange("preferredDate", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label className="modal-form-label" htmlFor="edit-time">Preferred Time</label>
                                    <select
                                        id="edit-time"
                                        className="modal-form-select"
                                        value={editForm.preferredTime}
                                        onChange={(e) => handleEditFieldChange("preferredTime", e.target.value)}
                                        required
                                    >
                                        <option value="">Select time</option>
                                        {TIME_OPTIONS.map(time => (
                                            <option key={time.value} value={time.value}>{time.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={closeEditModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary" disabled={isUpdating}>
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}