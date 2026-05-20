import axios from "axios";
import {
  LOGIN_URL,
  RESET_PASSWORD_VERIFY_URL,
  VERFY_USER_URL,
} from "../../utils/consts";

export const verifyPasswordResetInDb = async (email, code, password) => {
  const data = { email: email, kod: code, haslo: password };
  try {
    const response = await axios.post(RESET_PASSWORD_VERIFY_URL, data, {
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
