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
    if (response.data.success) {
      return response.data;
    } else {
      console.error("Błąd. ResetPasswordEmail");
      console.error(response);
      throw new Error("Błąd. ResetPasswordEmail");
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        error.message ||
        error.response?.data?.message ||
        "Błąd. ResetPasswordEmail",
    };
  }
};
