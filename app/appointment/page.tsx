'use client';

import React, { useState } from 'react';
import { COLORS } from '@/lib/constants';
import '@/styles/appointment.css';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

interface FormData {
  name: string;
  issue: string;
  environment: string;
  serviceType: 'repair' | 'new' | '';
  serviceCategory: string;
  description: string;
  selectedAddress: string;
  urgency: 'low' | 'medium' | 'high';
  preferredDate: string;
  preferredTime: string;
}

const REPAIR_SERVICES = [
  { id: 'mechanic', name: 'Vehicle Mechanic', icon: '🔧' },
  { id: 'plumber', name: 'Plumber', icon: '🔧' },
  { id: 'electrician', name: 'Electrician', icon: '⚡' },
  { id: 'carpenter', name: 'Carpenter', icon: '🪚' },
  { id: 'hvac', name: 'HVAC Technician', icon: '❄️' },
  { id: 'painter', name: 'Painter', icon: '🎨' },
  { id: 'mason', name: 'Mason', icon: '🧱' },
  { id: 'appliance', name: 'Appliance Technician', icon: '🔧' },
  { id: 'pest', name: 'Pest Control', icon: '🐛' },
];

const NEW_CONSTRUCTION_SERVICES = [
  { id: 'plumber', name: 'Plumber', icon: '🔧' },
  { id: 'carpenter', name: 'Carpenter', icon: '🪚' },
  { id: 'painter', name: 'Painter', icon: '🎨' },
  { id: 'mason', name: 'Mason', icon: '🧱' },
];

const ENVIRONMENTS = [
  'Kitchen', 'Bathroom', 'Bedroom', 'Living Room', 'Garage', 'Garden', 'Basement', 'Attic', 'Office', 'Other'
];

export default function AppointmentPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    issue: '',
    environment: '',
    serviceType: '',
    serviceCategory: '',
    description: '',
    selectedAddress: '',
    urgency: 'medium',
    preferredDate: '',
    preferredTime: ''
  });

  const [addresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+1234567890',
      address: '123 Main St, City, State 12345',
      isDefault: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+0987654321',
      address: '456 Oak Ave, City, State 67890',
      isDefault: false
    }
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceTypeChange = (type: 'repair' | 'new') => {
    setFormData(prev => ({
      ...prev,
      serviceType: type,
      serviceCategory: '' // Reset category when type changes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Appointment booked successfully! You will receive a confirmation shortly.');
      // Reset form or redirect
    }, 2000);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.issue && formData.environment;
      case 2:
        return formData.serviceType && formData.serviceCategory && formData.description;
      case 3:
        return formData.selectedAddress && formData.preferredDate && formData.preferredTime;
      default:
        return false;
    }
  };

  const getServiceOptions = () => {
    return formData.serviceType === 'repair' ? REPAIR_SERVICES : NEW_CONSTRUCTION_SERVICES;
  };

  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <h1 className="appointment-title">Book Professional Service</h1>
        <p className="appointment-subtitle">
          Get expert help for your home and vehicle needs. Our professionals are ready to assist you.
        </p>
        
        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Basic Info</span>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Service Details</span>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Schedule & Address</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="appointment-form">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <h2 className="step-title">Basic Information</h2>
            
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="form-input"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Issue Summary *</label>
              <input
                type="text"
                placeholder="e.g., Leaking kitchen faucet, Broken air conditioner"
                className="form-input"
                value={formData.issue}
                onChange={(e) => handleInputChange('issue', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Environment/Location *</label>
              <select
                className="form-select"
                value={formData.environment}
                onChange={(e) => handleInputChange('environment', e.target.value)}
                required
              >
                <option value="">Select location</option>
                {ENVIRONMENTS.map(env => (
                  <option key={env} value={env}>{env}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Urgency Level</label>
              <div className="urgency-buttons">
                {[
                  { value: 'low', label: 'Low', color: '#10B981' },
                  { value: 'medium', label: 'Medium', color: '#F59E0B' },
                  { value: 'high', label: 'High', color: '#EF4444' }
                ].map(({ value, label, color }) => (
                  <button
                    key={value}
                    type="button"
                    className={`urgency-btn ${formData.urgency === value ? 'active' : ''}`}
                    onClick={() => handleInputChange('urgency', value)}
                    style={{ 
                      backgroundColor: formData.urgency === value ? color : 'transparent',
                      borderColor: color,
                      color: formData.urgency === value ? 'white' : color
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Service Details */}
        {currentStep === 2 && (
          <div className="form-step">
            <h2 className="step-title">Service Details</h2>
            
            <div className="form-group">
              <label className="form-label">Service Type *</label>
              <div className="service-type-buttons">
                <button
                  type="button"
                  className={`service-type-btn ${formData.serviceType === 'repair' ? 'active' : ''}`}
                  onClick={() => handleServiceTypeChange('repair')}
                >
                  <span className="service-icon">🔧</span>
                  <span>Repair Work</span>
                  <span className="service-desc">Fix existing issues</span>
                </button>
                <button
                  type="button"
                  className={`service-type-btn ${formData.serviceType === 'new' ? 'active' : ''}`}
                  onClick={() => handleServiceTypeChange('new')}
                >
                  <span className="service-icon">🏗️</span>
                  <span>New Construction</span>
                  <span className="service-desc">Build something new</span>
                </button>
              </div>
            </div>

            {formData.serviceType && (
              <div className="form-group">
                <label className="form-label">Service Category *</label>
                <div className="service-grid">
                  {getServiceOptions().map(service => (
                    <button
                      key={service.id}
                      type="button"
                      className={`service-card ${formData.serviceCategory === service.id ? 'active' : ''}`}
                      onClick={() => handleInputChange('serviceCategory', service.id)}
                    >
                      <span className="service-card-icon">{service.icon}</span>
                      <span className="service-card-name">{service.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Detailed Description *</label>
              <textarea
                placeholder="Please provide detailed description of the work needed, including any specific requirements or issues..."
                className="form-textarea"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Step 3: Schedule & Address */}
        {currentStep === 3 && (
          <div className="form-step">
            <h2 className="step-title">Schedule & Address</h2>
            
            <div className="form-group">
              <label className="form-label">Service Address *</label>
              <div className="address-list">
                {addresses.map(address => (
                  <div
                    key={address.id}
                    className={`address-card ${formData.selectedAddress === address.id ? 'active' : ''}`}
                    onClick={() => handleInputChange('selectedAddress', address.id)}
                  >
                    <div className="address-header">
                      <span className="address-name">{address.name}</span>
                      {address.isDefault && <span className="default-badge">Default</span>}
                    </div>
                    <div className="address-details">
                      <p>{address.address}</p>
                      <p className="address-phone">{address.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Preferred Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Time *</label>
                <select
                  className="form-select"
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  required
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
            </div>

            <div className="payment-info">
              <div className="info-card">
                <h3>Payment Information</h3>
                <p>💳 Payment will be collected after the work is completed</p>
                <p>📋 Final bill will include service charges and any additional materials used</p>
                <p>🔄 You can cancel this appointment anytime from your orders</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Navigation */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button
              type="button"
              className="nav-btn secondary"
              onClick={() => setCurrentStep(prev => prev - 1)}
            >
              Previous
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              className="nav-btn primary"
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceedToNext()}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="nav-btn primary"
              disabled={!canProceedToNext() || isSubmitting}
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}