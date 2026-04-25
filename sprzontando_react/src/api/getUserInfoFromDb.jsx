import axios from "axios";
import {
  OFFERS_URL,
  US_LAST_OFFER,
  US_RATING,
  USER_APPLIED_OFFERS_URL,
  USER_INFO_URL,
} from "../../utils/consts";

export const getUserInfoFromDb = async (userId) => {
  const data = {
    user_id: userId,
  };

  try {
    const response = await axios.post(USER_INFO_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return { success: true, data: handleSuccess(response.data.data) };
    } else {
      throw new Error(
        response.data.message ||
          "Nie udało się pobrać informacji o użytkowniku.",
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
const handleSuccess = (user) => {
  return {
    ...user,
    [US_RATING]: user[US_RATING] ?? 0,
    [US_LAST_OFFER]: user[US_LAST_OFFER] ?? "Brak ostatniego zlecenia",
  };
};
