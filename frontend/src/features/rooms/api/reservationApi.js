import axios from "axios";
import config from "../../../config/config";

export function deleteReservation(token, id) {
  return axios.delete(`${config.api_url}/reservation/${id}`, {
      headers: {
          "x-auth-token": token
      }
  });
}




async function addReservation(token, data) {
    const url = `${config.api_url}/reservation`;
    return await axios.post(url, data, {
        headers: {
            "x-auth-token": token
        }
    });
}


const getRooms = async (token, page, perPage, searchTerm) => {
    return await axios.get(`${config.api_url}/reservation`, {
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






async function editReservation(token,id, data) {
    const url = `${config.api_url}/reservation/${id}`;
    return await axios.put(url, data,{
        headers: {
            "x-auth-token": token
        }
    });
}


export {
    addReservation,
    getRooms,
    editReservation
}
