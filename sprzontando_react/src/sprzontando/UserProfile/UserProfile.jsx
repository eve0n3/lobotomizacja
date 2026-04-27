import Container from "@mui/material/Container";
import UserAvatar from "../../components/UserAvatar";
import { getLoggedUser, getLoggedUserId } from "../../../utils/utilis";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";

import {
  HOME_LOCATION,
  LOGIN_LOCATION,
  US_EMAIL,
  US_LAST_OFFER,
  US_RATING,
  US_USERNAME,
} from "../../../utils/consts";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Rating,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfoFromDb } from "../../api/getUserInfoFromDb";
import EditIcon from "@mui/icons-material/Edit";
import { flexCentered, flexCenteredColumn } from "../../styles/AppStyle";
import ChangeEmailPopup from "./ChangeEmailPopup";
import ChangeUsernamePopup from "./ChangeUsernamePopup";
import ChangePasswordPopup from "./ChangePasswordPopup";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const [isEmailPopupOpen, setIsEmialPopupOpen] = useState(false);
  const [isPassPopupOpen, setIsPassPopupOpen] = useState(false);
  const [isUsernamePopupOpen, setIsUsernamePopupOpen] = useState(false);

  const loggedUserId = getLoggedUserId();
  const loggedUser = getLoggedUser();

  useEffect(() => {
    if (loggedUserId === null) {
      navigate(LOGIN_LOCATION);
      return;
    }
    const loadUser = async () => {
      const result = await getUserInfoFromDb(loggedUserId);
      setLoading(false);

      if (result.success) {
        setUser(result.data);
      } else {
        setError("Nie udało się załadować danych użytkownika.");
      }
    };

    loadUser();
  }, [loggedUserId]);

  if (loggedUserId === null) return null;
  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  const handleLogout = () => {
    Cookies.remove("loggedas");
    navigate(HOME_LOCATION);
    return;
  };

  return (
    <>
      <Container sx={flexCenteredColumn}>
        <UserAvatar loggedUser={loggedUser} />
        <Box sx={flexCentered}>
          <Typography variant="h4">{user[US_USERNAME]} </Typography>
          <IconButton
            onClick={() => setIsUsernamePopupOpen(true)}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Box sx={flexCentered}>
          <Typography variant="h5" color="text.secondary">
            {user[US_EMAIL]}
          </Typography>
          <IconButton
            onClick={() => setIsEmialPopupOpen(true)}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        </Box>

        <Typography>Ocena </Typography>
        <Rating
          name="read-only"
          value={user[US_RATING]}
          precision={0.1}
          readOnly
        />
        <Typography>Ostanie zlecenie: </Typography>
        <Typography>{user[US_LAST_OFFER]}</Typography>
        <Divider sx={{ width: "100%", my: 2 }} />
        <Button onClick={() => setIsPassPopupOpen(true)} variant="outlined">
          zmień hasło
        </Button>
        <Button onClick={handleLogout} variant="outlined" color="error">
          wyloguj się
        </Button>
      </Container>
      <ChangeEmailPopup
        isEmailPopupOpen={isEmailPopupOpen}
        setIsEmialPopupOpen={setIsEmialPopupOpen}
      />
      <ChangeUsernamePopup
        isUsernamePopupOpen={isUsernamePopupOpen}
        setIsUsernamePopupOpen={setIsUsernamePopupOpen}
      />
      <ChangePasswordPopup
        isPassPopupOpen={isPassPopupOpen}
        setIsPassPopupOpen={setIsPassPopupOpen}
      />
    </>
  );
};
export default UserProfile;
