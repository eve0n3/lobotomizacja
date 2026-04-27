import Container from "@mui/material/Container";
import UserAvatar from "../../components/UserAvatar";
import { getLoggedUser, getLoggedUserId } from "../../../utils/utilis";
import Typography from "@mui/material/Typography";
import {
  LOGIN_LOCATION,
  US_EMAIL,
  US_LAST_OFFER,
  US_RATING,
  US_USERNAME,
} from "../../../utils/consts";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, LinearProgress, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfoFromDb } from "../../api/getUserInfoFromDb";
import OtherUserAvatar from "../../components/OtherUserAvatar";
import { flexCentered, flexCenteredColumn } from "../../styles/AppStyle";

const OtherUserProfile = () => {
  const location = useLocation();

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

  return (
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
      <Typography>Ostanie zlecenie: </Typography>
      <Typography>{user[US_LAST_OFFER] || "Brak ostaniego zlecnia"}</Typography>
    </Container>
  );
};
export default OtherUserProfile;
