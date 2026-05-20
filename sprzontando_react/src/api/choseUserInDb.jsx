import axios from "axios";
import {
  CHOSE_USER_URL,
  OFFERS_URL,
  US_LAST_OFFER,
  US_RATING,
  USER_APPLIED_OFFERS_URL,
  USER_INFO_URL,
} from "../../utils/consts";

export const choseUserInDb = async (userId, offerId) => {
  const data = {
    id_uz: userId,
    id_ogl: offerId,
  };

  try {
    const response = await axios.post(CHOSE_USER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      throw new Error(
        response.data.message || "Nie udało się wybrać wykonawcy.",
      );
    }
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status || "",
      message: error.response?.data?.message || error.message || "",
    };
  }
};
