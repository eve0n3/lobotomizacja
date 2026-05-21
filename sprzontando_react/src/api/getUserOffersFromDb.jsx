import axios from "axios";
import { OFFERS_URL, USER_OFFERS_URL } from "../../utils/consts";
import { getOfferAppliedUserFromDb } from "./getOfferAppliedUserFromDb";

export const getUserOffersFromDb = async (userId, mode) => {
  const data = {
    id_zglasz: userId,
    mode: mode,
  };
  try {
    const response = await axios.post(USER_OFFERS_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Received offers:", response.data);
    if (response.data.success) {
      return await handleSuccessResponse(response);
    } else {
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
const handleSuccessResponse = async (response) => {
  console.log("Received offers:", response.data);
  const oferty = response.data.data;
  const offersWithUsers = await getAppliedUsers(oferty);
  return { success: true, data: offersWithUsers };
};
const getAppliedUsers = async (offers) => {
  try {
    const offersWithUsers = await Promise.all(
      offers.map(async (oferta) => {
        const response = await getOfferAppliedUserFromDb(oferta.id);
        if (response.success) {
          return { ...oferta, appliedUsers: response.data };
        } else {
          throw new Error(response.data.message || "Nie można pobrać ofert.");
        }
      }),
    );

    return offersWithUsers;
  } catch (error) {
    console.error("Error fetching applied users:", error);
  }
};
