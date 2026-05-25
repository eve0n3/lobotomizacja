import { ADMIN_USERS_URL } from "../../utils/consts";

export async function getUsersForAdminBan(filters = {}) {
  try {
    const response = await fetch(ADMIN_USERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });

    if (response.ok) {
      const jsonData = await response.json();
      return jsonData;
    } else {
      console.error("Response status:", response.status);
      return {
        success: false,
        message: `HTTP ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}
