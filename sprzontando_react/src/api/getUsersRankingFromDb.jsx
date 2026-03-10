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

    console.log(response.data);

    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
