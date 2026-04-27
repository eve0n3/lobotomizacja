import axios from "axios";
import {
  LOGIN_URL,
  RESET_PASSWORD_EMAIL_URL,
  VERFY_USER_URL,
} from "../../utils/consts";

export const sendResetPasswordEmail = async (email) => {
  try {
    const response = await axios.post(
      RESET_PASSWORD_EMAIL_URL,
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
