import axios from "axios";
import { ADMIN_URL } from "../../utils/consts";

const postAdminAction = async (payload) => {
  try {
    const response = await axios.post(ADMIN_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const reportOffer = ({ offerId, userId, reason }) =>
  postAdminAction({
    action: "reportOffer",
    offer_id: offerId,
    user_id: userId,
    reason,
  });

export const banOffer = ({ adminId, offerId, ban = 1 }) =>
  postAdminAction({
    action: "banOffer",
    admin_id: adminId,
    offer_id: offerId,
    ban,
  });

export const getOfferReports = (adminId) =>
  postAdminAction({ action: "getReports", admin_id: adminId });

export const resolveOfferReport = ({ adminId, reportId, decision }) =>
  postAdminAction({
    action: "resolveReport",
    admin_id: adminId,
    report_id: reportId,
    decision,
  });

export const getLowRatedUsers = (adminId) =>
  postAdminAction({ action: "lowRatedUsers", admin_id: adminId });

export const banUser = ({ adminId, userId, days }) =>
  postAdminAction({
    action: "banUser",
    admin_id: adminId,
    user_id: userId,
    days,
  });

export const searchUsersStats = ({ adminId, query }) =>
  postAdminAction({
    action: "searchUsers",
    admin_id: adminId,
    query,
  });
