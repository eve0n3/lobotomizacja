import axios from "axios";
import { OFFER_UPDATE_URL } from "../../utils/consts";

export const updateOffer = async (data) => {
  try {
    const response = await axios.post(OFFER_UPDATE_URL, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
