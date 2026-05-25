import Container from "@mui/material/Container";
import UserAvatar from "../../components/UserAvatar";
import { getLoggedUser, getLoggedUserId } from "../../../utils/utilis";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";

import {
  HOME_LOCATION,
  LOGIN_LOCATION,
  OF_CITY,
  OF_ID,
  OF_TITLE,
  OF_TYPE,
  US_EMAIL,
  US_LAST_OFFER,
  US_RATING,
  US_USERNAME,
} from "../../../utils/consts";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
  Rating,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfoFromDb } from "../../api/getUserInfoFromDb";
import EditIcon from "@mui/icons-material/Edit";
import { flexCentered, flexCenteredColumn } from "../../styles/AppStyle";
import ChangeEmailPopup from "./ChangeEmailPopup";
import ChangeUsernamePopup from "./ChangeUsernamePopup";
import ChangePasswordPopup from "./ChangePasswordPopup";
import { getLastOfferFromDb } from "../../api/getLastOfferFromDb";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [error, setError] = useState(null);

  const [offerError, setOfferError] = useState(null);
  const [isOfferLoading, setIsOfferLoading] = useState(true);
  const [lastOffer, setLastOffer] = useState(null);

  const [isEmailPopupOpen, setIsEmialPopupOpen] = useState(false);
  const [isPassPopupOpen, setIsPassPopupOpen] = useState(false);
  const [isUsernamePopupOpen, setIsUsernamePopupOpen] = useState(false);

  const loggedUserId = getLoggedUserId();
  const loggedUser = getLoggedUser();
  const getUserLastOffer = async () => {
    setIsOfferLoading(true);
    const result = await getLastOfferFromDb(loggedUserId);
    if (result.success) {
      setLastOffer(result.data);

      setIsOfferLoading(false);
      console.log(result.data);
    } else {
      setOfferError(
        result.message || "Nie udało się pobrać ostatniego ogłoszenia.",
      );
      setIsOfferLoading(false);
    }
  };

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
    getUserLastOffer();
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
  const getLastOfferSection = () => {
    if (lastOffer && lastOffer[OF_TITLE]) {
      return (
        <Stack direction="column" spacing={1} alignItems="center">
          <Typography variant="h6" weight="fontWeightMedium">
            Tytuł:
          </Typography>
          <Typography color="text.secondary">{lastOffer[OF_TITLE]}</Typography>
          <Typography variant="h6" weight="fontWeightMedium">
            Kategoria:
          </Typography>
          <Typography color="text.secondary">{lastOffer[OF_TYPE]}</Typography>
          <Typography variant="h6" weight="fontWeightMedium">
            Miasto:
          </Typography>
          <Typography color="text.secondary">{lastOffer[OF_CITY]}</Typography>
        </Stack>
      );
    } else {
      return <Typography>Brak ostatniego ogłoszenia</Typography>;
    }
  };

  return (
    <>
      <Stack spacing={2} sx={flexCenteredColumn}>
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

        <Typography variant="h5">Ocena: </Typography>
        <Rating
          name="read-only"
          value={user[US_RATING]}
          precision={0.1}
          size="large"
          readOnly
        />
        <Divider sx={{ width: "100%", my: 2 }} />
        <Box>
          <Typography variant="h5">Ostatnie zlecenie: </Typography>
          {isOfferLoading ? (
            <CircularProgress />
          ) : offerError ? (
            <Typography color="error">{offerError}</Typography>
          ) : (
            getLastOfferSection(lastOffer)
          )}
        </Box>
        <Divider sx={{ width: "100%", my: 2 }} />
        <Button onClick={() => setIsPassPopupOpen(true)} variant="outlined">
          zmień hasło
        </Button>
        <Button onClick={handleLogout} variant="outlined" color="error">
          wyloguj się
        </Button>
      </Stack>
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
