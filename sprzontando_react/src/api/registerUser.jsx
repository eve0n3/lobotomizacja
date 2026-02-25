import axios from "axios";
import { REGISTER_URL } from "../../utils/consts";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(REGISTER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    return { success: true, message: "Pomyslnie utworzono użytkonika." };
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
