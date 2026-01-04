import React, { useState } from 'react'
import { post_vehicleform } from '../functions/claim_functions'
import '../css/pages_css/Profile.css'

export const VehicleInsForm = () => {

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
        setFormData((prev) => ({ ...prev, [name]: e.target.value }))
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
            .then(() => alert("Vehicle claim submitted!"))
            .catch((err) => alert("Submission failed"));
    }

    return (
        <div className='form-container'>
            <div className='profile-heading'>Vehicle Insurance Claim</div>

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