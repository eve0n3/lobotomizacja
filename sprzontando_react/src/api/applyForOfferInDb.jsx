import axios from "axios";
import { ADD_OFFER_URL, APPLY_FOR_OFFER_URL } from "../../utils/consts";

export const applyForOfferInDb = async (data) => {
  try {
    const response = await axios.post(APPLY_FOR_OFFER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      message: "Pomyślnie zgłoszono się do wykonania ogłoszenia.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
