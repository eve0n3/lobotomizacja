import axios from "axios";
import {
  ADD_OFFER_URL,
  LAST_OFFER_URL,
  REPORT_OFFER_URL,
} from "../../utils/consts";

export const getLastOfferFromDb = async (id) => {
  try {
    const response = await axios.post(
      LAST_OFFER_URL,
      { user_id: id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response.data.success);
    if (response.data.success === true) {
      return {
        success: true,
        message: "Pomyślnie pobrano ostatnie ogłoszenie.",
        data: response.data.data,
      };
    } else {
      console.error("Błąd odpowiedzi z serwera:", response.data);
      throw new Error(response.data.message || "Wystąpił błąd");
    }
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
