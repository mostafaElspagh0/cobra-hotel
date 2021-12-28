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

