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
import { Button, LinearProgress, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfoFromDb } from "../../api/getUserInfoFromDb";
import OtherUserAvatar from "../../components/OtherUserAvatar";

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
    <Container>
      <OtherUserAvatar username={user[US_USERNAME]} />
      <Typography>Nazwa: </Typography>
      <Typography>{user[US_USERNAME]}</Typography>
      <Typography>Email: </Typography>
      <Typography>{user[US_EMAIL]}</Typography>
      <Typography>Ocena: </Typography>

      <Rating
        name="read-only"
        value={user[US_RATING]}
        precision={0.1}
        readOnly
      />
      <Typography>Ostanie zlecenie: </Typography>
      <Typography>
        {user[US_LAST_OFFER] || "Brak ostaniego zlecenia"}
      </Typography>
    </Container>
  );
};
export default OtherUserProfile;
