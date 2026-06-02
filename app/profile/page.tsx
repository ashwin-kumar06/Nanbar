'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Plus,
  Star,
  Trash2,
  Pencil,
  X,
} from 'lucide-react';
import { COLORS } from '@/lib/constants';
import Cookies from 'js-cookie';
import '@/styles/profile.css';

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

interface ProfileData {
  fullName: string;
  phone: string;
  email: string;
  memberSince: string;
  preferredServices: string[];
}

const EMPTY_ADDRESS_FORM = {
  label: 'Home',
  name: '',
  phone: '',
  addressLine: '',
  city: '',
  pincode: '',
  setAsDefault: false,
};

export default function ProfilePage() {
  const data = Cookies.get('UserData');
  console.log("data: ", data)

  const [profile, setProfile] = useState<ProfileData>({
    fullName: data.name,
    phone: data.mobile,
    email: data.email,
    memberSince: 'January 2025',
    preferredServices: ['Plumber', 'Electrician', 'Vehicle Mechanic'],
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      name: 'Ashwin Kumar',
      phone: '+91 98765 43210',
      addressLine: '123 Main Street, Koramangala',
      city: 'Bengaluru',
      pincode: '560034',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Office',
      name: 'Ashwin Kumar',
      phone: '+91 98765 43210',
      addressLine: '45 Tech Park Road, Phase 2',
      city: 'Bengaluru',
      pincode: '560100',
      isDefault: false,
    },
  ]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState(profile);
  const [profileSaved, setProfileSaved] = useState(false);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS_FORM);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const appointmentCount = 4;
  const communityPosts = 2;

  const openAddAddressModal = () => {
    setEditingAddressId(null);
    setAddressForm({
      ...EMPTY_ADDRESS_FORM,
      name: profile.fullName,
      phone: profile.phone,
      setAsDefault: addresses.length === 0,
    });
    setIsAddressModalOpen(true);
  };

  const openEditAddressModal = (address: Address) => {
    setEditingAddressId(address.id);
    setAddressForm({
      label: address.label,
      name: address.name,
      phone: address.phone,
      addressLine: address.addressLine,
      city: address.city,
      pincode: address.pincode,
      setAsDefault: address.isDefault,
    });
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
    setEditingAddressId(null);
    setAddressForm(EMPTY_ADDRESS_FORM);
  };

  const handleProfileEdit = () => {
    setProfileDraft(profile);
    setIsEditingProfile(true);
    setProfileSaved(false);
  };

  const handleProfileCancel = () => {
    setProfileDraft(profile);
    setIsEditingProfile(false);
  };

  const handleProfileSave = () => {
    setProfile(profileDraft);
    setIsEditingProfile(false);
    setProfileSaved(true);
    window.setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0] = { ...filtered[0], isDefault: true };
      }
      return filtered;
    });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = {
      label: addressForm.label.trim() || 'Home',
      name: addressForm.name.trim(),
      phone: addressForm.phone.trim(),
      addressLine: addressForm.addressLine.trim(),
      city: addressForm.city.trim(),
      pincode: addressForm.pincode.trim(),
    };

    if (!trimmed.name || !trimmed.phone || !trimmed.addressLine || !trimmed.city) {
      return;
    }

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((addr) => {
          if (addr.id !== editingAddressId) {
            return addressForm.setAsDefault
              ? { ...addr, isDefault: false }
              : addr;
          }
          return {
            ...addr,
            ...trimmed,
            isDefault: addressForm.setAsDefault,
          };
        })
      );
    } else {
      const newId = String(Date.now());
      setAddresses((prev) => {
        const next = addressForm.setAsDefault
          ? prev.map((a) => ({ ...a, isDefault: false }))
          : [...prev];
        return [
          ...next,
          {
            id: newId,
            ...trimmed,
            isDefault: addressForm.setAsDefault || prev.length === 0,
          },
        ];
      });
    }

    closeAddressModal();
  };

  const formatFullAddress = (addr: Address) =>
    `${addr.addressLine}, ${addr.city}${addr.pincode ? ` – ${addr.pincode}` : ''}`;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="header-content">
          <h1 className="profile-title">Your Profile</h1>
          <p className="profile-subtitle">
            Manage your account details and saved service addresses for bookings
            and appointments on Nanban.
          </p>
        </div>
      </div>

      <div className="profile-content">
        <aside className="profile-sidebar">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              <User size={40} style={{ color: COLORS.primary }} />
            </div>
            <p className="profile-display-name">{profile.fullName}</p>
            <p className="profile-member-since">Member since {profile.memberSince}</p>
          </div>

          <div className="profile-stat-list">
            <div className="profile-stat-item">
              <span className="profile-stat-label">Appointments</span>
              <span className="profile-stat-value">{appointmentCount}</span>
            </div>
            <div className="profile-stat-item">
              <span className="profile-stat-label">Community posts</span>
              <span className="profile-stat-value">{communityPosts}</span>
            </div>
            <div className="profile-stat-item">
              <span className="profile-stat-label">Saved addresses</span>
              <span className="profile-stat-value">{addresses.length}</span>
            </div>
          </div>

          <div className="profile-quick-links">
            <Link href="/bookappointment" className="profile-quick-link">
              Book appointment
            </Link>
            <Link href="/appointments" className="profile-quick-link">
              View appointments
            </Link>
          </div>
        </aside>

        <div className="profile-main">
          <section className="profile-section">
            <div className="profile-section-header">
              <div>
                <h2 className="profile-section-title">Account details</h2>
                <p className="profile-section-desc">
                  Information used when booking repairs and home services.
                </p>
              </div>
              {!isEditingProfile && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleProfileEdit}
                >
                  <Pencil size={16} />
                  Edit profile
                </button>
              )}
            </div>

            <div className="profile-details-grid">
              <div className="profile-field">
                <span className="profile-field-label">Full name</span>
                {isEditingProfile ? (
                  <input
                    className="profile-field-input"
                    value={profileDraft.fullName}
                    onChange={(e) =>
                      setProfileDraft((p) => ({ ...p, fullName: e.target.value }))
                    }
                  />
                ) : (
                  <span className="profile-field-value">
                    <User size={18} style={{ color: COLORS.primary }} />
                    {profile.fullName}
                  </span>
                )}
              </div>

              <div className="profile-field">
                <span className="profile-field-label">Phone</span>
                {isEditingProfile ? (
                  <input
                    className="profile-field-input"
                    value={profileDraft.phone}
                    onChange={(e) =>
                      setProfileDraft((p) => ({ ...p, phone: e.target.value }))
                    }
                  />
                ) : (
                  <span className="profile-field-value">
                    <Phone size={18} style={{ color: COLORS.primary }} />
                    {profile.phone}
                  </span>
                )}
              </div>

              <div className="profile-field">
                <span className="profile-field-label">Email</span>
                {isEditingProfile ? (
                  <input
                    type="email"
                    className="profile-field-input"
                    value={profileDraft.email}
                    onChange={(e) =>
                      setProfileDraft((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                ) : (
                  <span className="profile-field-value">
                    <Mail size={18} style={{ color: COLORS.primary }} />
                    {profile.email}
                  </span>
                )}
              </div>

              <div className="profile-field">
                <span className="profile-field-label">Member since</span>
                <span className="profile-field-value">
                  <Calendar size={18} style={{ color: COLORS.primary }} />
                  {profile.memberSince}
                </span>
              </div>

              <div className="profile-field full-width">
                <span className="profile-field-label">Preferred services</span>
                <div className="profile-tags">
                  {profile.preferredServices.map((service) => (
                    <span key={service} className="profile-tag">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {isEditingProfile && (
              <div className="profile-section-actions">
                <button type="button" className="btn-primary" onClick={handleProfileSave}>
                  Save changes
                </button>
                <button type="button" className="btn-secondary" onClick={handleProfileCancel}>
                  Cancel
                </button>
                {profileSaved && <span className="profile-save-toast">Profile updated</span>}
              </div>
            )}
          </section>

          <section className="profile-section">
            <div className="profile-section-header">
              <div>
                <h2 className="profile-section-title">Saved addresses</h2>
                <p className="profile-section-desc">
                  Addresses used for service visits when you book appointments.
                </p>
              </div>
              <button type="button" className="btn-primary" onClick={openAddAddressModal}>
                <Plus size={16} />
                Add address
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="address-empty">
                <MapPin size={32} style={{ color: COLORS.accent, margin: '0 auto 0.75rem' }} />
                <p>No saved addresses yet. Add one to speed up your next booking.</p>
                <button type="button" className="btn-primary" onClick={openAddAddressModal}>
                  <Plus size={16} />
                  Add your first address
                </button>
              </div>
            ) : (
              <div className="address-list">
                {addresses.map((addr) => (
                  <article
                    key={addr.id}
                    className={`address-card ${addr.isDefault ? 'is-default' : ''}`}
                  >
                    <div className="address-card-header">
                      <div className="address-label-row">
                        <span className="address-label">{addr.label}</span>
                        {addr.isDefault && <span className="default-badge">Default</span>}
                      </div>
                      <div className="address-card-actions">
                        <button
                          type="button"
                          className="btn-ghost"
                          onClick={() => openEditAddressModal(addr)}
                          aria-label={`Edit ${addr.label} address`}
                        >
                          <Pencil size={14} />
                        </button>
                        {!addr.isDefault && (
                          <button
                            type="button"
                            className="btn-ghost"
                            onClick={() => handleSetDefault(addr.id)}
                            aria-label={`Set ${addr.label} as default`}
                          >
                            <Star size={14} />
                            Default
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-ghost danger"
                          onClick={() => handleDeleteAddress(addr.id)}
                          aria-label={`Remove ${addr.label} address`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="address-details">
                      <p className="address-contact-name">{addr.name}</p>
                      <p>{formatFullAddress(addr)}</p>
                      <p className="address-phone">{addr.phone}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {isAddressModalOpen && (
        <div
          className="profile-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="address-modal-title"
          onClick={closeAddressModal}
        >
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h3 id="address-modal-title" className="profile-modal-title">
              {editingAddressId ? 'Edit address' : 'Add new address'}
            </h3>
            <p className="profile-modal-subtitle">
              This address will be available when scheduling home services.
            </p>

            <form onSubmit={handleAddressSubmit}>
              <div className="profile-form-group">
                <label className="profile-form-label" htmlFor="addr-label">
                  Label
                </label>
                <select
                  id="addr-label"
                  className="profile-field-input"
                  value={addressForm.label}
                  onChange={(e) =>
                    setAddressForm((f) => ({ ...f, label: e.target.value }))
                  }
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="profile-form-row">
                <div className="profile-form-group">
                  <label className="profile-form-label" htmlFor="addr-name">
                    Contact name *
                  </label>
                  <input
                    id="addr-name"
                    className="profile-field-input"
                    required
                    value={addressForm.name}
                    onChange={(e) =>
                      setAddressForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label" htmlFor="addr-phone">
                    Phone *
                  </label>
                  <input
                    id="addr-phone"
                    className="profile-field-input"
                    required
                    value={addressForm.phone}
                    onChange={(e) =>
                      setAddressForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label" htmlFor="addr-line">
                  Street address *
                </label>
                <input
                  id="addr-line"
                  className="profile-field-input"
                  required
                  value={addressForm.addressLine}
                  onChange={(e) =>
                    setAddressForm((f) => ({ ...f, addressLine: e.target.value }))
                  }
                />
              </div>

              <div className="profile-form-row">
                <div className="profile-form-group">
                  <label className="profile-form-label" htmlFor="addr-city">
                    City *
                  </label>
                  <input
                    id="addr-city"
                    className="profile-field-input"
                    required
                    value={addressForm.city}
                    onChange={(e) =>
                      setAddressForm((f) => ({ ...f, city: e.target.value }))
                    }
                  />
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label" htmlFor="addr-pincode">
                    PIN code
                  </label>
                  <input
                    id="addr-pincode"
                    className="profile-field-input"
                    value={addressForm.pincode}
                    onChange={(e) =>
                      setAddressForm((f) => ({ ...f, pincode: e.target.value }))
                    }
                  />
                </div>
              </div>

              <label className="profile-field-value" style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={addressForm.setAsDefault}
                  onChange={(e) =>
                    setAddressForm((f) => ({ ...f, setAsDefault: e.target.checked }))
                  }
                />
                Set as default address
              </label>

              <div className="profile-modal-actions">
                <button type="button" className="btn-secondary" onClick={closeAddressModal}>
                  <X size={16} />
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingAddressId ? 'Save address' : 'Add address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
