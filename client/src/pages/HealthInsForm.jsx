import React, { useState } from 'react'
import { post_healthform } from '../functions/claim_functions'
import '../css/pages_css/HealthInsForm.css'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

export const HealthInsForm = () => {

    const [alert, setAlert] = useState({ show: false, type: '', message: '' })

    // 1. Updated state to hold specific file fields instead of an array
    const [formData, setFormData] = useState({
        company: '',
        policy: '',
        p_name: '',
        hosp_id: '',
        hosp_name: '',
        ad_date: '',
        dis_date: '',
        ailment: '',
        claim: '',
        user_story: '',
        medical_bill: null,   // Single file
        medical_report: null  // Single file
    })

    // List of companies for the dropdown
    const insuranceCompanies = [
        "Star Health",
        "HDFC Ergo",
        "ICICI Lombard",
        "Bajaj Allianz",
        "Niva Bupa",
        "Other"
    ];

    const handleChange = (e, name) => {
        const value = e.target.value;
        
        // Validation rules for different fields
        if (name === 'p_name' || name === 'hosp_name' || name === 'ailment') {
            // Only allow letters and spaces for names
            if (value && !/^[a-zA-Z\s]*$/.test(value)) {
                return; // Block invalid input
            }
        }
        
        if (name === 'policy' || name === 'hosp_id') {
            // Only allow letters and numbers (alphanumeric)
            if (value && !/^[a-zA-Z0-9]*$/.test(value)) {
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

    const handleRestriction = (e) => {
        const {id, value} = e.target;

        if(id === 'name')
        {

        }
    }

    // 2. Updated file handler to take the field name and single file
    const handleFileChange = (e, name) => {
        const file = e.target.files[0] ? e.target.files[0] : null;
        setFormData((prev) => ({ ...prev, [name]: file }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const dataPayload = new FormData();

        // 3. Simplified append logic
        Object.keys(formData).forEach((key) => {
            // Only append if the value exists (prevents appending "null" string)
            if (formData[key]) {
                dataPayload.append(key, formData[key]);
            }
        });

        post_healthform(dataPayload)
            .then(() => {
                setAlert({ show: true, type: 'success', message: 'Health insurance claim submitted successfully!' })
                setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000)
            })
            .catch((err) => {
                setAlert({ show: true, type: 'error', message: 'Failed to submit claim. Please try again.' })
                setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000)
            })
    }

    

    return (
        <div className='form-container'>
            <div className='profile-heading'>Health Insurance Claim</div>

            {alert.show && (
                <Stack sx={{ width: '100%', maxWidth: '700px', marginBottom: '20px' }} spacing={2}>
                    <Alert variant="filled" severity={alert.type}>
                        {alert.message}
                    </Alert>
                </Stack>
            )}

            <form className='profile-form' onSubmit={handleSubmit}>

                {/* 4. Company Field changed to Dropdown */}
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

                <div className='fields'>
                    <label>Patient Name</label>
                    <input
                        type="text"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'p_name')}
                        value={formData.p_name}
                        required
                    />
                </div>

                <div className='fields'>
                    <label>Hospital ID</label>
                    <input
                        type="text"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'hosp_id')}
                        value={formData.hosp_id}
                        required
                    />
                </div>

                <div className='fields'>
                    <label>Hospital Name</label>
                    <input
                        type="text"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'hosp_name')}
                        value={formData.hosp_name}
                        required
                    />
                </div>

                <div className='field-row'>
                    <div className='fields'>
                        <label>Admission Date</label>
                        <input
                            type="date"
                            className='field-input'
                            onChange={(e) => handleChange(e, 'ad_date')}
                            value={formData.ad_date}
                            required
                        />
                    </div>
                    <div className='fields'>
                        <label>Discharge Date</label>
                        <input
                            type="date"
                            className='field-input'
                            onChange={(e) => handleChange(e, 'dis_date')}
                            value={formData.dis_date}
                            required
                        />
                    </div>
                </div>

                <div className='fields'>
                    <label>Ailment</label>
                    <input
                        type="text"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'ailment')}
                        value={formData.ailment}
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
                    <label>User Story</label>
                    <textarea
                        className='field-input'
                        onChange={(e) => handleChange(e, 'user_story')}
                        value={formData.user_story}
                        required
                        rows="4"
                    ></textarea>
                </div>

                {/* 5. Split File Inputs */}
                
                {/* Field A: Medical Bill */}
                <div className='fields'>
                    <label>Medical Bill (Image/PDF)</label>
                    <input
                        type="file"
                        className='field-input'
                        onChange={(e) => handleFileChange(e, 'medical_bill')}
                        required
                    />
                    {formData.medical_bill && (
                        <p style={{fontSize: '12px', color: '#22c55e', marginTop: '5px'}}>
                            Selected: {formData.medical_bill.name}
                        </p>
                    )}
                </div>

                {/* Field B: Medical Report */}
                <div className='fields'>
                    <label>Medical Report (Image/PDF)</label>
                    <input
                        type="file"
                        className='field-input'
                        onChange={(e) => handleFileChange(e, 'medical_report')}
                        required
                    />
                    {formData.medical_report && (
                        <p style={{fontSize: '12px', color: '#22c55e', marginTop: '5px'}}>
                            Selected: {formData.medical_report.name}
                        </p>
                    )}
                </div>

                <button type="submit" className='submit-btn'>
                    Submit Claim
                </button>

            </form>

        </div>
    )
}