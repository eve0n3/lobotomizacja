import axios from "axios";
import { OFFERS_URL, USER_APPLIED_OFFERS_URL } from "../../utils/consts";

export const getOfferAppliedUserFromDb = async (offerId) => {
  const data = {
    id_ogl: offerId,
  };

  try {
    const response = await axios.post(USER_APPLIED_OFFERS_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Ofer Applied users:", response.data);
    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
