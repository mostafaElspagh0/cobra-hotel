import axios from "axios";
import config from "../../../config/config";

export async function updateEmployeeById(token, id, data) {
    const url = `${config.api_url}/employee/${id}`;
    return await axios.put(url, data, {
        headers: {
            "x-auth-token" : token
        }
    });
}


const getEmployees = async (token,page , perPage) => {
    return await axios.get(`${config.api_url}/employee`, {
        headers: {
            "x-auth-token": token
        },
        params: {
            page: page||0,
            limit: perPage || 10,
        }
    });
}

const getEmployeeId = async (token, id) => {
    const res = await axios.get(`${config.api_url}/employee/${id}`, {
        headers: {
            "x-auth-token": token
        }
    });
    return res.data.user;
}

const deleteEmployeeById = async (token, id) => {
    const res = await axios.delete(`${config.api_url}/employee/${id}`, {
        headers: {
            "x-auth-token": token
        }
    });
    return res;
}


export  {
    getEmployees
    , getEmployeeId,
    deleteEmployeeById
}
