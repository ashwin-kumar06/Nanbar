"use client";
import React, { useEffect } from 'react';
import { COLORS } from '@/lib/constants';
import '@/styles/appointments.css';
import '@/styles/community.css';
import axios from 'axios';

export default function Appointments() {
    const [appointments, setAppointments] = React.useState<any[]>([]);

    useEffect(() => {
        getAppointments();
    }, [])

    const getAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:5213/Appointment');
            const data = await response.data;
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    const categories = [
        { name: "All", count: 156, active: true },
        { name: "Plumber", count: 45, active: false },
        { name: "Electrician", count: 32, active: false },
        { name: "Carpenter", count: 28, active: false },
        { name: "Painter", count: 24, active: false },
        { name: "HVAC", count: 15, active: false },
        { name: "Mason", count: 12, active: false }
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Low': return COLORS.success;
            case 'Medium': return COLORS.warning;
            case 'High': return COLORS.danger;
            default: return COLORS.accent;
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
                                <option value="recent">Most Recent</option>
                                <option value="popular">Most Popular</option>
                                <option value="helpful">Most Helpful</option>
                            </select>
                        </div>
                    </div>

                    <div className="posts-grid">
                        {appointments.map((item) => (
                            <div key={item.appointmentId} className="post-card">
                                <div className="post-image">
                                    <div className="post-category">{item.name}</div>
                                </div>

                                <div className="post-content">
                                    <h3 className="post-title">{item.serviceType}</h3>
                                    <h3 className="post-title">{item.serviceCategory}</h3>
                                    <h3 className="post-title">{item.issueSummary}</h3>
                                    <p className="post-description">{item.detailedDescription}</p>

                                    <div className="post-meta">
                                        <div className="post-stats">
                                            <span className="difficulty-badge">{item.urgencyLevel}</span>
                                            <span
                                                className="difficulty-badge"
                                                style={{ backgroundColor: getDifficultyColor(item.urgencyLevel) }}
                                            >
                                                {item.urgencyLevel}
                                            </span>
                                            <span className="stat-item">{item.environment}</span>
                                            <span className="stat-item">{item.preferredDate}</span>
                                            <span className="stat-item">{item.preferredTime}</span>
                                        </div>
                                    </div>

                                    <div className="post-footer">
                                        <div className="post-author">
                                            <span className="author-name">{item.serviceAddress}</span>
                                            <span className="post-time">{item.timeAgo}</span>
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
        </div>
    );
}