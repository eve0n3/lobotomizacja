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
import { useNavigate } from "react-router-dom";
import { Button, LinearProgress, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfoFromDb } from "../../api/getUserInfoFromDb";
import OtherUserAvatar from "../../components/OtherUserAvatar";

const OtherUserProfile = (userId) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const result = await getUserInfoFromDb(userId);
      setLoading(false);

      if (result.success) {
        setUser(result.data);
      } else {
        setError("Nie udało się załadować danych użytkownika.");
      }
    };

    loadUser();
  }, [userId]);

  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
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
      <Typography>{user[US_LAST_OFFER]}</Typography>
    </Container>
  );
};
export default OtherUserProfile;
