import axios from "axios";
import config from "../../../config/config";

const signIn = async (email,
                      password) => {
    const res = await axios.post(`${config.api_url}/auth/login`, {
        email,
        password
    });
    return res.data.token;
}

const forgetPassword = async (email) => {

    return axios.post(`${config.api_url}/auth/forgetPassword`, {
        email
    });
    
}

const resetPassword = async (token,newPassword) => {
    return axios.post(`${config.api_url}/auth/resetPassword`, {
        new_password: newPassword,
        token: token
    });

}
export {
    signIn,
    forgetPassword,
    resetPassword
}