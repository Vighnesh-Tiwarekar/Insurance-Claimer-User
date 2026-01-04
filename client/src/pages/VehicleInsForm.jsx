import React, { useState } from 'react'
import { post_vehicleform } from '../functions/claim_functions'
import '../css/pages_css/Profile.css'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

export const VehicleInsForm = () => {

    const [alert, setAlert] = useState({ show: false, type: '', message: '' })

    const [formData, setFormData] = useState({
        company: '',
        policy: '',
        incident_date: '',
        wheeler_type: '', // New field
        driver_name: '',
        driver_license: '',
        vehicle_no: '',
        claim: '',
        user_story: '',
        damage_desc: 'None',
        documents: []
    })

    // Dropdown options
    const insuranceCompanies = [
        "HDFC Ergo",
        "ICICI Lombard",
        "Bajaj Allianz",
        "Tata AIG",
        "Digit Insurance",
        "Acko",
        "Other"
    ];

    const vehicleTypes = [
        "2-Wheeler (Bike/Scooter)",
        "3-Wheeler (Auto)",
        "4-Wheeler (Car/Jeep)",
        "Commercial Truck/Bus",
        "Other"
    ];

    const handleChange = (e, name) => {
        const value = e.target.value;

        // Validation rules for different fields
        if (name === 'driver_name') {
            // Only allow letters and spaces for driver name
            if (value && !/^[a-zA-Z\s]*$/.test(value)) {
                return;
            }
        }

        if (name === 'policy') {
            // Allow letters, numbers, hyphens, and slashes for policy number
            if (value && !/^[a-zA-Z0-9\-\/]*$/.test(value)) {
                return;
            }
        }

        if (name === 'driver_license') {
            // Allow letters and numbers, max 16 characters
            if (value && (!/^[a-zA-Z0-9]*$/.test(value) || value.length > 16)) {
                return;
            }
        }

        if (name === 'vehicle_no') {
            // Vehicle number format: letters, numbers, and hyphens (e.g., MH-12-AB-1234)
            if (value && !/^[a-zA-Z0-9\-]*$/.test(value)) {
                return;
            }
        }

        if (name === 'claim') {
            // Only allow positive numbers for claim amount
            if (value && (!/^\d*\.?\d*$/.test(value) || parseFloat(value) < 0)) {
                return;
            }
        }

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setFormData((prev) => ({ ...prev, documents: files }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const dataPayload = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === 'documents') {
                return;
            }
            dataPayload.append(key, formData[key]);
        });

        formData.documents.forEach((file) => {
            dataPayload.append('documents', file);
        });

        post_vehicleform(dataPayload)
            .then(() => {
                setAlert({ show: true, type: 'success', message: 'Vehicle insurance claim submitted successfully!' })
                setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000)
            })
            .catch((err) => {
                setAlert({ show: true, type: 'error', message: 'Failed to submit claim. Please try again.' })
                setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000)
            });
    }

    return (
        <div className='form-container'>
            <div className='profile-heading'>Vehicle Insurance Claim</div>

            {alert.show && (
                <Stack sx={{ width: '100%', maxWidth: '700px', marginBottom: '20px' }} spacing={2}>
                    <Alert variant="filled" severity={alert.type}>
                        {alert.message}
                    </Alert>
                </Stack>
            )}

            <form className='profile-form' onSubmit={handleSubmit}>

                {/* Company Dropdown */}
                <div className='fields'>
                    <label>Company</label>
                    <select
                        className='field-input'
                        onChange={(e) => handleChange(e, 'company')}
                        value={formData.company}
                        required
                    >
                        <option value="" disabled>Select Insurance Company</option>
                        {insuranceCompanies.map((comp) => (
                            <option key={comp} value={comp}>{comp}</option>
                        ))}
                    </select>
                </div>

                <div className='fields'>
                    <label>Policy No.</label>
                    <input
                        type="text"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'policy')}
                        value={formData.policy}
                        required
                    />
                </div>

                {/* New Wheeler Type Field */}
                <div className='fields'>
                    <label>Vehicle Type</label>
                    <select
                        className='field-input'
                        onChange={(e) => handleChange(e, 'wheeler_type')}
                        value={formData.wheeler_type}
                        required
                    >
                        <option value="" disabled>Select Vehicle Type</option>
                        {vehicleTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className='fields'>
                    <label>Incident Date</label>
                    <input
                        type="date"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'incident_date')}
                        value={formData.incident_date}
                        required
                    />
                </div>

                <div className='fields'>
                    <label>Driver Name</label>
                    <input
                        type="text"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'driver_name')}
                        value={formData.driver_name}
                        required
                    />
                </div>

                <div className='fields'>
                    <label>Driver License No.</label>
                    <input
                        type="text"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'driver_license')}
                        value={formData.driver_license}
                        maxLength="16"
                        required
                    />
                </div>

                <div className='fields'>
                    <label>Vehicle Number</label>
                    <input
                        type="text"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'vehicle_no')}
                        value={formData.vehicle_no}
                        required
                    />
                </div>

                <div className='fields'>
                    <label>Claim Amount</label>
                    <input
                        type="number"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'claim')}
                        value={formData.claim}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className='fields'>
                    <label>Incident Description (User Story)</label>
                    <textarea
                        className='field-input'
                        onChange={(e) => handleChange(e, 'user_story')}
                        value={formData.user_story}
                        required
                        rows="4"
                    ></textarea>
                </div>

                <div className='fields'>
                    <label>Images (Damage/Accident Photos)</label>
                    <input
                        type="file"
                        multiple
                        className='field-input'
                        onChange={handleFileChange}
                        required
                    />
                    <p style={{fontSize: '14px', color: '#666', marginTop: '5px'}}>
                        Selected files: {formData.documents.length}
                    </p>
                </div>

                <button type="submit" className='submit-btn'>
                    Submit Claim
                </button>

            </form>
        </div>
    )
}