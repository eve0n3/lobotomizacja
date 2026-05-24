import axios from "axios";
import {
  OFFERS_URL,
  REPORTED_OFFERS_URL,
  USER_OFFERS_APPLICATIONS_URL,
} from "../../utils/consts";

export const getUserOffersApplicationsFromDb = async (userId, mode) => {
  const data = {
    id_chetnego: userId,
    mode: mode,
  };

  try {
    const response = await axios.post(USER_OFFERS_APPLICATIONS_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      console.error(response.data);
      throw new Error(response.data.message || "Nie można pobrać ofert.");
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
