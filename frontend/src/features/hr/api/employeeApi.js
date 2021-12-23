import axios from "axios";
import config from "../../../config/config";

const getEmployees = async (token, page , perPage) => {
    const res = await axios.get(`${config.api_url}/employee`, {
        headers: {
            "x-auth-token": token
        },
        params: {
            page: page||0,
            limit: perPage || 10,
        }
    });
    return res;
}

const getEmployeeId = async (token, id) => {
    const res = await axios.get(`${config.api_url}/employee/${id}`, {
        headers: {
            "x-auth-token": token
        }
    });
    return res.data.user;
}


export  {
    getEmployees
    , getEmployeeId
}
