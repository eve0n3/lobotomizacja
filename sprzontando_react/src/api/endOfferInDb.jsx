import axios from "axios";
import {
  END_OFFER_URL,
  OFFERS_URL,
  REPORTED_OFFERS_URL,
  USER_OFFERS_APPLICATIONS_URL,
} from "../../utils/consts";

export const endOfferInDb = async (offerId) => {
  const data = {
    id: offerId,
  };
  console.log("Ending offer with data:", data);
  try {
    const response = await axios.post(END_OFFER_URL, data, {
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
          "Nie można zakończyć oferty. Spróbuj ponownie poźniej.",
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
