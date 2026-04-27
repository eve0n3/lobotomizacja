import axios from "axios";
import { ADD_OFFER_URL, CHANGE_USER_INFO_URL } from "../../utils/consts";

export const changeUserPasswordInDb = async (
  userId,
  oldpassword,
  newpassword,
) => {
  const data = {
    id: userId,
    oldpass: oldpassword,
    newpass: newpassword,
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
