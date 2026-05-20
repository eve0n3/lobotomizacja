import axios from "axios";
import { OFFERS_URL, REPORTED_OFFERS_URL } from "../../utils/consts";

export const getReportedOffersFromDb = async () => {
  try {
    const response = await axios.post(REPORTED_OFFERS_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      console.error(response.data);
      throw new Error(response.data.message || "Nie można pobrać ofert.");
    }
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
