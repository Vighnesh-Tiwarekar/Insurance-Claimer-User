import React from 'react';
import '../css/components_css/LeftSection.css';

const LeftSection = () => {
  return (
    <div className="auth-left-container">
      <div className="brand-header">
        <div className="logo-shield">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
        </div>
        <h2 className="brand-name">SecureLife Insurance</h2>
      </div>
      
      <h1 className="hero-title">
        Manage Your Insurance Claims with Confidence
      </h1>
      
      <p className="hero-subtitle">
        Access your policy information, submit claims, and track your coverage all in one secure platform.
      </p>

      <div className="feature-list">
        <div className="feature-item">
          <div className="feature-text">
            <h4>Comprehensive Coverage</h4>
            <p>Health, vehicle, and travel insurance plans tailored to your needs.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-text">
            <h4>Fast Claim Processing</h4>
            <p>Submit and track your claims with quick approval times.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-text">
            <h4>Secure & Reliable</h4>
            <p>Your personal information is protected with industry-leading security.</p>
          </div>
        </div>
      </div>

      <div className="trust-indicators">
        <div className="trust-item">
          <span className="trust-number">50K+</span>
          <span className="trust-label">Active Policies</span>
        </div>
        <div className="trust-item">
          <span className="trust-number">98%</span>
          <span className="trust-label">Customer Satisfaction</span>
        </div>
        <div className="trust-item">
          <span className="trust-number">24/7</span>
          <span className="trust-label">Support Available</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;