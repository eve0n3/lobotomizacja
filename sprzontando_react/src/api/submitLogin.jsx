import axios from "axios";
import { LOGIN_URL } from "../../utils/consts";

export const submitLogin = async (data) => {
  try {
    const response = await axios.post(LOGIN_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      type: error.response?.data?.type || "",
    };
  }
};
