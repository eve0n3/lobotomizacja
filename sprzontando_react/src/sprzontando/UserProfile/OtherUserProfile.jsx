import Container from "@mui/material/Container";
import UserAvatar from "../../components/UserAvatar";
import { getLoggedUser, getLoggedUserId } from "../../../utils/utilis";
import Typography from "@mui/material/Typography";
import {
  LOGIN_LOCATION,
  OF_CITY,
  OF_TITLE,
  OF_TYPE,
  US_EMAIL,
  US_ID,
  US_LAST_OFFER,
  US_RATING,
  US_USERNAME,
} from "../../../utils/consts";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  LinearProgress,
  Rating,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfoFromDb } from "../../api/getUserInfoFromDb";
import OtherUserAvatar from "../../components/OtherUserAvatar";
import { flexCentered, flexCenteredColumn } from "../../styles/AppStyle";
import { getLastOfferFromDb } from "../../api/getLastOfferFromDb";
import BackButton from "../../components/BackButton";

const OtherUserProfile = () => {
  const location = useLocation();
  const [offerError, setOfferError] = useState(null);
  const [isOfferLoading, setIsOfferLoading] = useState(true);
  const [lastOffer, setLastOffer] = useState(null);

  const user = location.state?.user;
  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          Błąd: Nie można wyświetlić szczegółów użytkownika.
        </Typography>
      </Container>
    );
  }
  const getUserLastOffer = async () => {
    setIsOfferLoading(true);
    const result = await getLastOfferFromDb(user[US_ID]);
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
    getUserLastOffer();
  }, []);
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
      <BackButton />
      <Container sx={flexCenteredColumn}>
        <OtherUserAvatar username={user[US_USERNAME]} />
        <Box sx={flexCentered}>
          <Typography variant="h4">{user[US_USERNAME]} </Typography>
        </Box>
        <Box sx={flexCentered}>
          <Typography variant="h5" color="text.secondary">
            {user[US_EMAIL]}
          </Typography>
        </Box>

        <Typography>Ocena </Typography>
        <Rating
          name="read-only"
          value={user[US_RATING]}
          precision={0.1}
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
      </Container>
    </>
  );
};
export default OtherUserProfile;
