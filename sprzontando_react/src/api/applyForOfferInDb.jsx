import axios from "axios";
import { ADD_OFFER_URL, APPLY_FOR_OFFER_URL } from "../../utils/consts";

export const applyForOfferInDb = async ({ offerId, userId }) => {
  console.log("Applying for offer with ID:", offerId, "by user ID:", userId);
  const data = {
    id_ogl: offerId,
    id_chetnego: userId,
  };

  try {
    const response = await axios.post(APPLY_FOR_OFFER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Applying", response);
    if (!response.data.success) {
      return {
        success: false,
        message:
          response.data.message ||
          "Nie udało się zgłosić się do wykonania ogłoszenia.",
      };
    }
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
