import { BAN_USER_URL } from "../../utils/consts";

export async function banUserInDb(id, dateEnd) {
  try {
    const response = await fetch(BAN_USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        date_end: dateEnd,
      }),
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
