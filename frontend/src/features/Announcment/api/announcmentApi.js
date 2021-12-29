import axios from "axios";
import config from "../../../config/config";

export async function addAnnouncement(token, data) {
  const url = `${config.api_url}/announcement`;
  return await axios.post(url, data, {
    headers: {
      "x-auth-token" : token
    }
  });
}


export async function getAnnouncement(token, page, perPage)  {
  return await axios.get(`${config.api_url}/announcement/my`, {
    headers: {
      'x-auth-token': token
    },
    params: {
      page: page || 0,
      limit: perPage || 10,
    }
  });
}

