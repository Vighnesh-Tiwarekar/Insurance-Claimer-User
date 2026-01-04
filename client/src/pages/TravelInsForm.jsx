import React, { useState } from 'react'
import { post_travelform } from '../functions/claim_functions'
import '../css/pages_css/Profile.css'

export const TravelInsForm = () => {

    // 1. Updated state to handle specific files and travel type
    const [formData, setFormData] = useState({
        company: '',
        policy: '',
        incident_date: '',
        claim: '',
        user_story: '',
        travel_type: '', // 'Domestic' or 'International'
        ticket_file: null,
        passport_file: null,
        visa_file: null
    })

    const insuranceCompanies = [
        "HDFC Ergo",
        "ICICI Lombard",
        "Bajaj Allianz",
        "Tata AIG",
        "Digit Insurance",
        "Acko",
        "Other"
    ];

    const handleChange = (e, name) => {
        setFormData((prev) => ({ ...prev, [name]: e.target.value }))
    }

    // 2. Updated file handler to accept specific field names
    const handleFileChange = (e, name) => {
        const file = e.target.files[0] ? e.target.files[0] : null;
        setFormData((prev) => ({ ...prev, [name]: file }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const dataPayload = new FormData();

        // Append text fields
        Object.keys(formData).forEach((key) => {
            if (key.includes('_file')) {
                return; // Skip file keys here
            }
            dataPayload.append(key, formData[key]);
        });

        // 3. Logic to append files based on Travel Type
        if (formData.ticket_file) {
            dataPayload.append('ticket_file', formData.ticket_file);
        }

        if (formData.travel_type === 'International') {
            if (formData.passport_file) dataPayload.append('passport_file', formData.passport_file);
            if (formData.visa_file) dataPayload.append('visa_file', formData.visa_file);
        }

        post_travelform(dataPayload)
            .then(() => alert("Travel claim submitted!"))
            .catch((err) => alert("Submission failed"));
    }

    return (
        <div className='form-container'>
            <div className='profile-heading'>Travel Insurance Claim</div>

            <form className='profile-form' onSubmit={handleSubmit}>

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

                {/* 4. Travel Type Dropdown */}
                <div className='fields'>
                    <label>Travel Type</label>
                    <select
                        className='field-input'
                        onChange={(e) => handleChange(e, 'travel_type')}
                        value={formData.travel_type}
                        required
                    >
                        <option value="" disabled>Select Travel Type</option>
                        <option value="Domestic">Domestic</option>
                        <option value="International">International</option>
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

                <div>
                    <div className='fields'>
                        <label htmlFor="">Claim Amount</label>
                    <input
                        type="number"
                        className='field-input'
                        onChange={(e) => handleChange(e, 'claim')}
                        value={formData.claim}
                        required
                    />
                    </div>
                </div>

                <div className='fields'>
                    <label>Incident Description (User Story)</label>
                    <div style={{fontSize: '12px', color: '#666', marginBottom: '5px'}}>
                        Please include: object name, brand, visible colors, material, size, and any distinctive markings/logos.
                    </div>
                    <textarea
                        className='field-input'
                        onChange={(e) => handleChange(e, 'user_story')}
                        value={formData.user_story}
                        placeholder="E.g., Lost Samsonite suitcase, Black hard-shell, Large size, with a red ribbon on the handle..."
                        required
                        rows="4"
                    ></textarea>
                </div>

                {/* 5. Conditional File Inputs */}

                {/* Always Show Ticket */}
                <div className='fields'>
                    <label>Travel Ticket (Image/PDF)</label>
                    <input
                        type="file"
                        className='field-input'
                        onChange={(e) => handleFileChange(e, 'ticket_file')}
                        required
                    />
                </div>

                {/* Only Show Passport & Visa if International */}
                {formData.travel_type === 'International' && (
                    <>
                        <div className='fields'>
                            <label>Passport Copy (Image/PDF)</label>
                            <input
                                type="file"
                                className='field-input'
                                onChange={(e) => handleFileChange(e, 'passport_file')}
                                required
                            />
                        </div>

                        <div className='fields'>
                            <label>Visa Copy (Image/PDF)</label>
                            <input
                                type="file"
                                className='field-input'
                                onChange={(e) => handleFileChange(e, 'visa_file')}
                                required
                            />
                        </div>
                    </>
                )}

                <button type="submit" className='submit-btn'>
                    Submit Claim
                </button>

            </form>
        </div>
    )
}