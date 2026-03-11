import axios from "axios";
import { REGISTER_URL } from "../../utils/consts";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(REGISTER_URL, data, {
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
