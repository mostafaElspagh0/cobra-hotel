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

export  {
    signIn
}