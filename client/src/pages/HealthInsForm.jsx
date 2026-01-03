import React, { useState } from 'react'
import { post_healthform } from '../functions/claim_functions'

export const HealthInsForm = () => {

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
        setFormData((prev) => ({ ...prev, [name]: e.target.value }))
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
    }

    return (
        <>
            <div className='w-fit mx-auto text-xl font-bold mt-5'>Health Insurance Claim</div>

            <form className='w-full max-w-lg mx-auto mt-10 flex flex-col gap-4' onSubmit={handleSubmit}>

                {/* 4. Company Field changed to Dropdown */}
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

                <div>
                    <div>Patient Name</div>
                    <input
                        type="text"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'p_name')}
                        value={formData.p_name}
                        required
                    />
                </div>

                <div>
                    <div>Hospital ID</div>
                    <input
                        type="text"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'hosp_id')}
                        value={formData.hosp_id}
                        required
                    />
                </div>

                <div>
                    <div>Hospital Name</div>
                    <input
                        type="text"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'hosp_name')}
                        value={formData.hosp_name}
                        required
                    />
                </div>

                <div className='flex gap-4'>
                    <div className='w-1/2'>
                        <div>Admission Date</div>
                        <input
                            type="date"
                            className='border-2 w-full p-2'
                            onChange={(e) => handleChange(e, 'ad_date')}
                            value={formData.ad_date}
                            required
                        />
                    </div>
                    <div className='w-1/2'>
                        <div>Discharge Date</div>
                        <input
                            type="date"
                            className='border-2 w-full p-2'
                            onChange={(e) => handleChange(e, 'dis_date')}
                            value={formData.dis_date}
                            required
                        />
                    </div>
                </div>

                <div>
                    <div>Ailment</div>
                    <input
                        type="text"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'ailment')}
                        value={formData.ailment}
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
                    <div>User Story</div>
                    <textarea
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'user_story')}
                        value={formData.user_story}
                        required
                        rows="4"
                    ></textarea>
                </div>

                {/* 5. Split File Inputs */}
                
                {/* Field A: Medical Bill */}
                <div>
                    <div>Medical Bill (Image/PDF)</div>
                    <input
                        type="file"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleFileChange(e, 'medical_bill')}
                        required
                    />
                    {formData.medical_bill && (
                        <p className='text-xs text-green-600 mt-1'>
                            Selected: {formData.medical_bill.name}
                        </p>
                    )}
                </div>

                {/* Field B: Medical Report */}
                <div>
                    <div>Medical Report (Image/PDF)</div>
                    <input
                        type="file"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleFileChange(e, 'medical_report')}
                        required
                    />
                    {formData.medical_report && (
                        <p className='text-xs text-green-600 mt-1'>
                            Selected: {formData.medical_report.name}
                        </p>
                    )}
                </div>

                <button type="submit" className='submit-btn'>
                    Submit Claim
                </button>

            </form>

        </>
    )
}