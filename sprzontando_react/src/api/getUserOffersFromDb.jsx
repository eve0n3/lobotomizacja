import axios from "axios";
import { OFFERS_URL, USER_OFFERS_URL } from "../../utils/consts";

export const getUserOffersFromDb = async (userId) => {
  const data = {
    id_zglasz: userId,
  };
  try {
    const response = await axios.post(USER_OFFERS_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Received offers:", response.data);
    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
