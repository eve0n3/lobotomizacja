import axios from "axios";
import { ADD_OFFER_URL, EDIT_OFFER_URL } from "../../utils/consts";

export const editOfferInDb = async (data) => {
  try {
    const response = await axios.post(EDIT_OFFER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    return { success: true, message: "Pomyslnie edytowano ogloszenie." };
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
