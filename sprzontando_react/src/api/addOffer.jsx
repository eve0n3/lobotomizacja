import axios from "axios";
import { ADD_OFFER_URL } from "../../utils/consts";

export const addOffer = async (data) => {
  try {
    const response = await axios.post(ADD_OFFER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
