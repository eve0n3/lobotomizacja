import axios from "axios";
import { LOGIN_URL, VERFY_USER_URL } from "../../utils/consts";

export const verifyUserInDb = async (data) => {
  try {
    const response = await axios.post(VERFY_USER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
