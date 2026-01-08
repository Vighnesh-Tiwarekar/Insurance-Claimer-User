import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/pages_css/Home.css';

export const Home = () => {
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedType) {
      navigate(`/${selectedType}`);
    }
  };

  const insuranceOptions = [
    {
      id: 'health',
      title: 'Health Insurance',
      description: 'File claims for medical expenses, hospitalization, and healthcare services',
      icon: (
        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      gradientColor: 'gradient-red',
      bgColor: 'bg-red',
      borderColor: 'border-red',
    },
    {
      id: 'vehicle',
      title: 'Vehicle Insurance',
      description: 'Submit claims for accidents, damages, theft, or vehicle-related incidents',
      icon: (
        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      gradientColor: 'gradient-blue',
      bgColor: 'bg-blue',
      borderColor: 'border-blue',
    },
    {
      id: 'travel',
      title: 'Travel Insurance',
      description: 'File claims for trip cancellations, lost baggage, or travel emergencies',
      icon: (
        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradientColor: 'gradient-green',
      bgColor: 'bg-green',
      borderColor: 'border-green',
    },
  ];

  return (
    <div className="select-container">
      {/* Main Content */}
      <main className="select-main">
        {/* Page Title */}
        <div className="title-section">
          <h1 className="main-title">
            Select Insurance Type
          </h1>
          <p className="main-subtitle">
            Choose the type of insurance claim you would like to file
          </p>
        </div>

        {/* Insurance Options Grid */}
        <div className="insurance-grid">
          {insuranceOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedType(option.id)}
              className={`insurance-card ${option.bgColor} ${
                selectedType === option.id 
                  ? `${option.borderColor} selected` 
                  : 'border-gray'
              }`}
            >
              {/* Selection Indicator */}
              {selectedType === option.id && (
                <div className="selection-indicator">
                  <div className="indicator-circle">
                    <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={`icon-wrapper ${option.gradientColor}`}>
                {option.icon}
              </div>

              {/* Title */}
              <h3 className="card-title">
                {option.title}
              </h3>

              {/* Description */}
              <p className="card-description">
                {option.description}
              </p>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <div className="button-section">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`continue-btn ${selectedType ? 'enabled' : 'disabled'}`}
          >
            Continue to Claim Form →
          </button>

          {!selectedType && (
            <p className="help-text">
              Please select an insurance type to continue
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

