import Cookies from "js-cookie";
import { AP_CHOSEN_USER, OF_DATE } from "./consts";
export const getLoggedUserUsername = () => {
  const loggedas = Cookies.get("loggedas")
    ? JSON.parse(Cookies.get("loggedas"))
    : null;
  return loggedas ? loggedas.username : null;
};

export const getLoggedUserId = () => {
  const loggedas = Cookies.get("loggedas")
    ? JSON.parse(Cookies.get("loggedas"))
    : null;
  return loggedas ? loggedas.id : null;
};

export const getLoggedUser = () => {
  const loggedas = Cookies.get("loggedas")
    ? JSON.parse(Cookies.get("loggedas"))
    : null;
  return loggedas ? loggedas : null;
};

export const getIsLoggedUserAdmin = () => {
  const loggedas = Cookies.get("loggedas")
    ? JSON.parse(Cookies.get("loggedas"))
    : null;

  return loggedas ? Boolean(loggedas.admin) : null;
};
export const getIsUserChoosen = (users) => {
  if (users.length === 0) return false;
  return users.some((user) => user[AP_CHOSEN_USER] === 1);
};
export const getIsOfferOutdated = (offerDate) => {
  const date = new Date(offerDate);

  return date < Date.now();
};

export const getIsOudatedAndChoosen = (users, offerDate) => {
  const isChoosen = getIsUserChoosen(users);
  const isOutdated = getIsOfferOutdated(offerDate);
  return isChoosen && isOutdated;
};
