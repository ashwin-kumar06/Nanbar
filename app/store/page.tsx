// app/store/page.tsx

import React from 'react';
import { COLORS } from '@/lib/constants';
import '@/styles/store.css';

export default function StorePage() {
  const products = [
    { name: 'Plumbing Starter Kit', price: 499, tag: 'Plumber', rating: 4.5 },
    { name: 'Mini Screwdriver Set', price: 299, tag: 'Electrician', rating: 4.2 },
    { name: 'Electrical Tape Roll', price: 99, tag: 'Electrician', rating: 4.0 },
    { name: 'Basic Wall Drill', price: 1499, tag: 'Carpenter', rating: 4.7 },
    { name: 'Multipurpose Pliers', price: 349, tag: 'General', rating: 4.3 },
    { name: 'Measuring Tape 5m', price: 129, tag: 'General', rating: 4.4 },
  ];

  return (
    <div className="store-container">
      <div className="store-header">
        <div>
          <h1 className="store-title">DIY Tools Store</h1>
          <p className="store-subtitle">Purchase essential tools for home repairs and maintenance.</p>
        </div>
        <div className="store-actions">
          <button className="btn-secondary">View Cart</button>
          <button className="btn-primary">Checkout</button>
        </div>
      </div>

      <div className="store-content">
        {/* Sidebar filters */}
        <aside className="store-sidebar">
          <div className="filter-group">
            <h3 className="sidebar-title">Categories</h3>
            <label className="checkbox-item"><input type="checkbox" /> Plumber</label>
            <label className="checkbox-item"><input type="checkbox" /> Electrician</label>
            <label className="checkbox-item"><input type="checkbox" /> Carpenter</label>
            <label className="checkbox-item"><input type="checkbox" /> General</label>
          </div>
          <div className="filter-group">
            <h3 className="sidebar-title">Price</h3>
            <div className="price-range">
              <input type="number" placeholder="Min" className="search-input" />
              <span style={{ color: COLORS.accent }}>—</span>
              <input type="number" placeholder="Max" className="search-input" />
            </div>
          </div>
          <div className="filter-group">
            <h3 className="sidebar-title">Ratings</h3>
            <label className="checkbox-item"><input type="checkbox" /> 4★ & up</label>
            <label className="checkbox-item"><input type="checkbox" /> 3★ & up</label>
          </div>
          <button className="btn-secondary" style={{ width: '100%' }}>Reset Filters</button>
        </aside>

        {/* Main content */}
        <main className="store-main">
          <div className="products-header">
            <input className="search-input" placeholder="Search tools..." />
            <select className="sort-select">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="products-grid">
            {products.map((p, index) => (
              <div key={index} className="product-card">
                <div className="product-image">Image</div>
                <div className="product-content">
                  <div className="badge">{p.tag}</div>
                  <div className="product-title">{p.name}</div>
                  <div style={{ color: '#6B7280' }}>⭐ {p.rating.toFixed(1)}</div>
                  <div className="product-meta">
                    <div className="price">₹{p.price}</div>
                    <button className="add-btn" style={{ background: COLORS.secondary }}>Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
