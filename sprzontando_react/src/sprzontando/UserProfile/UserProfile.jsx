import Container from "@mui/material/Container";
import UserAvatar from "../../components/UserAvatar";
import { getLoggedUser } from "../../../utils/utilis";
import Typography from "@mui/material/Typography";
import { LOGIN_LOCATION } from "../../../utils/consts";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect } from "react";

const UserProfile = () => {
  const navigate = useNavigate();

  const loggedUser = getLoggedUser();

  console.log(loggedUser);

  useEffect(() => {
    if (loggedUser === null) {
      console.log(
        "nie ma zalogowanego użytkownika, przekierowanie do logowania",
      );
      navigate(LOGIN_LOCATION);
      return;
    }
  }, [loggedUser]);

  if (loggedUser === null) return null;

  return (
    <Container>
      <UserAvatar loggedUser={loggedUser} />
      <Typography>{loggedUser.username}</Typography>
      <Typography>tutaj będzie ocena</Typography>
      <Typography>tutaj będzie osanie wykonane zlecenie</Typography>
      {/* //tylko jeśli to twój profil */}
      <Typography>tu będzie zmian hasła</Typography>
      <Typography>tu bedzie zmiana maila</Typography>
      <Button variant="contained">wyloguj się</Button>
    </Container>
  );
};
export default UserProfile;
