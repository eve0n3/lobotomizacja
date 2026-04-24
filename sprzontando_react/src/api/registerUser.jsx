import axios from "axios";
import { REGISTER_URL } from "../../utils/consts";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(REGISTER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.success
      ? { success: true, message: "Pomyslnie utworzono uzytkownika." }
      : response.data;
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
