import axios from "axios";
import { PASSWORD_CHECK_URL, PASSWORD_RESET_URL } from "../../utils/consts";

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(
      PASSWORD_RESET_URL,
      { email },
      { headers: { "Content-Type": "application/json" } },
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const confirmPasswordReset = async ({ email, kod, haslo }) => {
  try {
    const response = await axios.post(
      PASSWORD_CHECK_URL,
      { email, kod, haslo },
      { headers: { "Content-Type": "application/json" } },
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
