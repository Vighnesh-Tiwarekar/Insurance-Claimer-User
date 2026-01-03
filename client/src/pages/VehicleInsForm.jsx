import React, { useState } from 'react'
import { post_vehicleform } from '../functions/claim_functions'

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
        <>
            <div className='w-fit mx-auto text-xl font-bold mt-5'>Vehicle Insurance Claim</div>

            <form className='w-full max-w-lg mx-auto mt-10 flex flex-col gap-4' onSubmit={handleSubmit}>

                {/* Company Dropdown */}
                <div>
                    <div>Company</div>
                    <select
                        className='border-2 w-full p-2 bg-white'
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

                <div>
                    <div>Policy No.</div>
                    <input
                        type="text"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'policy')}
                        value={formData.policy}
                        required
                    />
                </div>

                {/* New Wheeler Type Field */}
                <div>
                    <div>Vehicle Type</div>
                    <select
                        className='border-2 w-full p-2 bg-white'
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

                <div>
                    <div>Incident Date</div>
                    <input
                        type="date"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'incident_date')}
                        value={formData.incident_date}
                        required
                    />
                </div>

                <div>
                    <div>Driver Name</div>
                    <input
                        type="text"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'driver_name')}
                        value={formData.driver_name}
                        required
                    />
                </div>

                <div>
                    <div>Driver License No.</div>
                    <input
                        type="text"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'driver_license')}
                        value={formData.driver_license}
                        required
                    />
                </div>

                <div>
                    <div>Vehicle Number</div>
                    <input
                        type="text"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'vehicle_no')}
                        value={formData.vehicle_no}
                        required
                    />
                </div>

                <div>
                    <div>Claim Amount</div>
                    <input
                        type="number"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'claim')}
                        value={formData.claim}
                        required
                    />
                </div>

                <div>
                    <div>Incident Description (User Story)</div>
                    <textarea
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'user_story')}
                        value={formData.user_story}
                        required
                        rows="4"
                    ></textarea>
                </div>

                <div>
                    <div>Images (Damage/Accident Photos)</div>
                    <input
                        type="file"
                        multiple
                        className='border-2 w-full p-2'
                        onChange={handleFileChange}
                        required
                    />
                    <p className='text-sm text-gray-500 mt-1'>
                        Selected files: {formData.documents.length}
                    </p>
                </div>

                <button type="submit" className='submit-btn'>
                    Submit Claim
                </button>

            </form>
        </>
    )
}