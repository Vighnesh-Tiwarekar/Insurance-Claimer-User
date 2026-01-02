import axios from 'axios'

export const get_profile = async () => {

    try {

        const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/profile/get-profile`, 
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

        return res.data

    }
    catch (err) {

        console.log(err)

    }
}

export const post_profile = async (formData) => {

    try {

        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/profile/create-profile`,
            {
                data: formData
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

        return res.data

    }
    catch (err) {

        console.log(err)

    }
}

export const patch_profile = async (formData) => {

    try {

        const res = await axios.patch(`${import.meta.env.VITE_BASE_API_URL}/profile/update-profile`,
            {
                data: formData
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

        return res.data

    }
    catch (err) {

        console.log(err)

    }
}