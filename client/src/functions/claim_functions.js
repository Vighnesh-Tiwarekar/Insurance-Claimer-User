import axios from 'axios'

export const get_claimform = async () => {

    try {

        const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/claim/get-claims`, 
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

        console.log(res.data)

        return res.data

    }
    catch (err) {

        console.log(err)

    }
}

export const post_healthform = async (dataPayload) => {

    try {

        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/claim/health-claim`,
            dataPayload,
            {
                withCredentials: true
            });

        return res.data

    }
    catch (err) {

        console.log(err)

    }
}

export const post_vehicleform = async (dataPayload) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/claim/vehicle-claim`,
            dataPayload,
            {
                withCredentials: true
            });

        return res.data

    }
    catch (err) {
        console.log(err)
        throw err;
    }
}

export const post_travelform = async (dataPayload) => {

    try {
        // Endpoint: /claim/travel-claim (Ensure this route exists in backend)
        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/claim/travel-claim`,
            dataPayload,
            {
                withCredentials: true
            });

        return res.data

    }
    catch (err) {
        console.log(err)
        throw err;
    }
}