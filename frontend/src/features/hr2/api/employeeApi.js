import axios from "axios";
import config from "../../../config/config";

export async function updateEmployeeById(token, id, data) {
    const url = `${config.api_url}/employee/${id}`;
    return await axios.put(url, data, {
        headers: {
            "x-auth-token": token
        }
    });
}


const getEmployees = async (token, page, perPage, searchTerm) => {
    return await axios.get(`${config.api_url}/employee`, {
        headers: {
            "x-auth-token": token
        },
        params: {
            page: page || 0,
            limit: perPage || 10,
            search: searchTerm || ""
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
    return await axios.delete(`${config.api_url}/employee/${id}`, {
        headers: {
            "x-auth-token": token
        }
    });
}

const addEmployee = async (token, data) => {
    return await axios.post(`${config.api_url}/employee`, data, {
        headers: {
            "x-auth-token": token
        }
    });
}


const addReview = async (token, id, data) => {
    return await axios.post(`${config.api_url}/employee/review/${id}`, data, {
        headers: {
            "x-auth-token": token
        }
    });
}


export {
    getEmployees,
    getEmployeeId,
    addEmployee,
    deleteEmployeeById,
    addReview
}
