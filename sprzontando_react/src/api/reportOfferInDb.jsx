import axios from "axios";
import { ADD_OFFER_URL, REPORT_OFFER_URL } from "../../utils/consts";

export const reportOfferInDb = async (id) => {
  try {
    const response = await axios.post(
      REPORT_OFFER_URL,
      { id: id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response.data.success);
    if (response.data.success === true) {
      return { success: true, message: "Pomyślnie zgłoszono ogłoszenie." };
    } else {
      throw new Error("Wystąpił błąd");
    }
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
