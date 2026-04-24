import axios from "axios";
import { OFFERS_URL } from "../../utils/consts";

export const getOffersFromDb = async (data) => {
  try {
    const response = await axios.post(OFFERS_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Received offers:", response.data);
    return response.data.success
      ? { success: true, data: response.data.data }
      : response.data;
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
