import axios from "axios";
import config from "../../../config/config";

const sendEmailApi = async (token, to, subject, body) => {
    return await axios.post(`${config.api_url}/employee`, {
            "email": to,
            "subject": subject,
            "message": body,
        },
        {
            headers: {
                "x-auth-token": token
            },
        });
}

export {
    sendEmailApi
}