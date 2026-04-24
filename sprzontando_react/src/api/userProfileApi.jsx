import axios from "axios";
import { USER_PROFILE_URL } from "../../utils/consts";

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.post(
      USER_PROFILE_URL,
      { action: "get", user_id: userId },
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

export const updateUserProfile = async (data) => {
  try {
    const response = await axios.post(
      USER_PROFILE_URL,
      { ...data, action: "update" },
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
