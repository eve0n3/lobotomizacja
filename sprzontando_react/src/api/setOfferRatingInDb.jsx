import axios from "axios";
import {
  END_OFFER_URL,
  OFFERS_URL,
  REPORTED_OFFERS_URL,
  SET_OFFER_RATING_URL,
  USER_OFFERS_APPLICATIONS_URL,
} from "../../utils/consts";

export const setOfferRatingInDb = async (
  offerId,
  rating,
  ratingDescription,
) => {
  const data = {
    id_ogl: offerId,
    ocena: rating,
    opis: ratingDescription,
  };

  try {
    const response = await axios.post(SET_OFFER_RATING_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      console.error(response.data);
      throw new Error(
        response.data.message ||
          "Nie można ocenić oferty. Spróbuj ponownie poźniej.",
      );
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
