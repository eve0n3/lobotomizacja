import axios from "axios";
import { OK_OFFER_URL } from "../../utils/consts";

export const okReportedOfferInDb = async (id) => {
  try {
    const response = await axios.post(
      OK_OFFER_URL,
      { id: id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.data.success) {
      console.log(response.data);
      return { success: true, message: "Pomyślnie zbanowano ofertę" };
    } else {
      console.error(response.data);
      throw new Error(response.data.message || "Nie można zbanować oferty.");
    }
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
