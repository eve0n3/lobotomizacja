import axios from "axios";
import { REGISTER_URL } from "../../utils/consts";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(REGISTER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      console.log("Pomyślnie utworzono użytkonika.");
      return { success: true, message: "Pomyślnie utworzono użytkonika." };
    } else {
      console.error(response);
      throw new Error(response.message || "Wystąpił błąd. registeruser");
    }
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
