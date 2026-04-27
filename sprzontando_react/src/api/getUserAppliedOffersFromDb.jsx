import axios from "axios";
import { OFFERS_URL, USER_APPLIED_OFFERS_URL } from "../../utils/consts";

export const getUserAppliedOffersFromDb = async (userId) => {
  const data = {
    id_chetnego: userId,
  };
  try {
    const response = await axios.post(USER_APPLIED_OFFERS_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("User Applied offers:", response.data);
    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
