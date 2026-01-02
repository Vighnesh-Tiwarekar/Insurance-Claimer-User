import React, { useState } from 'react'
import { post_travelform } from '../functions/claim_functions'

export const TravelInsForm = () => {

    const [formData, setFormData] = useState({
        company: '',
        policy: '',
        incident_date: '',
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

        post_travelform(dataPayload)
            .then(() => alert("Travel claim submitted!"))
            .catch((err) => alert("Submission failed"));
    }

    return (
        <>
            <div className='w-fit mx-auto text-xl font-bold mt-5'>Travel Insurance Claim</div>

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
                    <div className="text-xs text-gray-500 mb-1">
                        Please include: object name, brand, visible colors, material, size, and any distinctive markings/logos.
                    </div>
                    <textarea
                        className='border-2 w-full p-2'
                        onChange={(e) => handleChange(e, 'user_story')}
                        value={formData.user_story}
                        placeholder="E.g., Lost Samsonite suitcase, Black hard-shell, Large size, with a red ribbon on the handle..."
                        required
                        rows="4"
                    ></textarea>
                </div>

                <div>
                    <div>Images (Tickets/Boarding Pass/Bills)</div>
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