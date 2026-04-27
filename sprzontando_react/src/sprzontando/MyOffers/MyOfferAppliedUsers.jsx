import {
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { getOfferAppliedUserFromDb } from "../../api/getOfferAppliedUserFromDb";
import { useState, useEffect } from "react";
import {
  OTHER_USER_PROFILE_LOCATION,
  US_USERNAME,
} from "../../../utils/consts";
import OtherUserAvatar from "../../components/OtherUserAvatar";
import { useNavigate } from "react-router-dom";

const MyOfferAppliedUsers = ({ offerUsers, offerId }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      if (offerUsers !== null) {
        setUsers(offerUsers);
        if (offerUsers.length === 0) {
          setError("Brak chętnych użytkowników.");
        }
        return;
      }

      // Pobierz z bazy
      setLoading(true);
      const result = await getOfferAppliedUserFromDb(offerId);
      setLoading(false);

      if (result.success) {
        setUsers(result.data);
        if (result.data.length === 0) {
          setError("Brak chętnych użytkowników.");
        }
      } else {
        setError("Nie udało się załadować chętnych użytkowników.");
      }
    };

    loadUsers();
  }, [offerId]);

  if (isLoading) return <LinearProgress />;

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }
  const handleClick = (user) => {
    navigate(OTHER_USER_PROFILE_LOCATION, { state: { user: user } });
  };

  return (
    <List>
      {users?.map((user) => (
        <ListItem
          disablePadding
          secondaryAction={<Button variant="contained">Wybierz</Button>}
        >
          <ListItemButton
            onClick={() => {
              handleClick(user);
            }}
          >
            <ListItemAvatar>
              <OtherUserAvatar username={user[US_USERNAME]} />
            </ListItemAvatar>
            <ListItemText primary={user[US_USERNAME]} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MyOfferAppliedUsers;
