import axios from "axios";
import { LOGIN_URL } from "../../utils/consts";

export const submitLogin = async (data) => {
  try {
    const response = await axios.post(LOGIN_URL, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return { success: true, message: "Logged successfully" };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
