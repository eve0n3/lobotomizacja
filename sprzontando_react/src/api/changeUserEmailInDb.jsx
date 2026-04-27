import axios from "axios";
import { ADD_OFFER_URL, CHANGE_USER_INFO_URL } from "../../utils/consts";

export const changeUserEmailInDb = async (userId, email) => {
  const data = {
    id: userId,
    email: email,
  };
  try {
    const response = await axios.post(CHANGE_USER_INFO_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
