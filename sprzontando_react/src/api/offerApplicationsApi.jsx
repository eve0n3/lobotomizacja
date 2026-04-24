import axios from "axios";
import { OFFER_APPLICATIONS_URL } from "../../utils/consts";

const postOfferApplicationAction = async (payload) => {
  try {
    const response = await axios.post(OFFER_APPLICATIONS_URL, payload, {
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

export const getOfferApplications = (offerId) =>
  postOfferApplicationAction({ action: "list", offer_id: offerId });

export const chooseOfferPerformer = ({ offerId, ownerId, performerId }) =>
  postOfferApplicationAction({
    action: "choose",
    offer_id: offerId,
    owner_id: ownerId,
    performer_id: performerId,
  });

export const rateOfferPerformer = ({
  offerId,
  ownerId,
  rating,
  label,
  description,
}) =>
  postOfferApplicationAction({
    action: "rate",
    offer_id: offerId,
    owner_id: ownerId,
    rating,
    label,
    description,
  });
