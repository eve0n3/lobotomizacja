import Cookies from "js-cookie";

const readLoggedUser = () => {
  const raw = Cookies.get("loggedas");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getLoggedUserUsername = () => {
  const loggedas = readLoggedUser();
  return loggedas ? loggedas.username : null;
};

export const getLoggedUserId = () => {
  const loggedas = readLoggedUser();
  return loggedas ? loggedas.id : null;
};

export const getLoggedUser = () => {
  return readLoggedUser();
};

export const isLoggedUserAdmin = () => {
  const loggedas = readLoggedUser();
  return loggedas?.role === "admin" || Number(loggedas?.id) === 1;
};

export const setLoggedUser = (user) => {
  Cookies.set("loggedas", JSON.stringify(user), { expires: 1, path: "/" });
};

export const logoutUser = () => {
  Cookies.remove("loggedas", { path: "/" });
};
