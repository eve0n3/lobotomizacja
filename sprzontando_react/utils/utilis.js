import Cookies from "js-cookie";
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
