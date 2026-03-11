import axios from "axios";
import { USERS_RANKING_URL } from "../../utils/consts";

export const getUsersRankingFromDb = async () => {
  try {
    const response = await axios.post(
      USERS_RANKING_URL,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
