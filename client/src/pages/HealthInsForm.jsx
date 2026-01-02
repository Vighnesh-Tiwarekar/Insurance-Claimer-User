import React, { useState } from 'react'
import { post_healthform } from '../functions/claim_functions'

export const HealthInsForm = () => {

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
        documents: []
    })


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

        post_healthform(dataPayload)

    }

    return (
        <>
            <div className='w-fit mx-auto text-xl font-bold mt-5'>Health Insurance Claim</div>

            <form className='w-full max-w-lg mx-auto mt-10 flex flex-col gap-4' onSubmit={handleSubmit}>

                <div>
                    <div>Company</div>
                    <input
                        type="text"
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'company')}
                        value={formData.company}
                        required
                    />
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

                <div>
                    <div>Image/Documents (Bills/Medical Report)</div>

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