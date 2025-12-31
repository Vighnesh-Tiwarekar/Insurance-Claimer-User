

export const generate_otp = () => {

    try {

        const otp = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString()
            + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString()

        return otp;

    }
    catch (err) {
        console.log('Error', err)
    }
}

export const send_otp = async (otp) => {

}