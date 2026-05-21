import {
  Box,
  CircularProgress,
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
  AP_CHOSEN_USER,
  AP_USER_ID,
  OTHER_USER_PROFILE_LOCATION,
  US_ID,
  US_USERNAME,
} from "../../../utils/consts";
import OtherUserAvatar from "../../components/OtherUserAvatar";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { flexCentered } from "../../styles/AppStyle";
import { choseUserInDb } from "../../api/choseUserInDb";

const MyOfferAppliedUsers = ({ offerUsers, offerId, setIsChosen }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isChosenLoading, setIsChosenLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const [chosenUser, setChosenUser] = useState(null);

  const checkChosenUser = (users) => {
    const chosen = users.find((user) => user[AP_CHOSEN_USER] === 1);
    setChosenUser(chosen || null);
    setIsChosen(!!chosen);
  };

  useEffect(() => {
    const loadUsers = async () => {
      if (offerUsers !== null) {
        setUsers(offerUsers);
        if (offerUsers.length === 0) {
          setError("Brak chętnych użytkowników.");
        } else {
          checkChosenUser(offerUsers);
        }
        return;
      }

      setLoading(true);
      const result = await getOfferAppliedUserFromDb(offerId);
      setLoading(false);

      if (result.success) {
        setUsers(result.data);
        if (result.data.length === 0) {
          setError("Brak chętnych użytkowników.");
        } else {
          checkChosenUser(result.data);
          console.log("Loaded users:", result.data);
        }
      } else {
        setError("Nie udało się załadować chętnych użytkowników.");
      }
    };

    loadUsers();
  }, [offerId]);

  const handleChoseClick = async (user) => {
    setIsChosenLoading(true);
    const result = await choseUserInDb(user[AP_USER_ID], offerId);
    if (result.success) {
      setChosenUser(user);
      setIsChosen(true);
    } else {
      setError(result.message || "Nie udało się wybrać wykonawcy.");
    }
    setIsChosenLoading(false);
  };

  if (isLoading) return <LinearProgress />;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  if (!users) return null;

  const getAppliedUsersList = () =>
    users.map((user, key) => (
      <ListItem
        key={key + 1}
        disablePadding
        secondaryAction={
          <Button
            startIcon={isChosenLoading && <CircularProgress size={20} />}
            disabled={isChosenLoading}
            onClick={() => {
              handleChoseClick(user);
            }}
            variant="contained"
          >
            Wybierz
          </Button>
        }
      >
        <ListItemButton onClick={() => handleClick(user)}>
          <ListItemAvatar>
            <OtherUserAvatar username={user[US_USERNAME]} />
          </ListItemAvatar>
          <ListItemText primary={user[US_USERNAME]} />
        </ListItemButton>
      </ListItem>
    ));

  const getAppliedUsersListWithChosen = () => {
    const chosenUserId = chosenUser[AP_USER_ID];
    return users.map((user, key) => {
      const isChosen = user[AP_USER_ID] === chosenUserId;

      return (
        <ListItem
          key={key + 1}
          disablePadding
          secondaryAction={
            isChosen && (
              <Box sx={flexCentered}>
                <CheckIcon color="success" />
                <Typography variant="body2" color="success">
                  WYBRANY WYKONAWCA
                </Typography>
              </Box>
            )
          }
        >
          <ListItemButton onClick={() => handleClick(user)}>
            <ListItemAvatar>
              <OtherUserAvatar username={user[US_USERNAME]} />
            </ListItemAvatar>
            <ListItemText primary={user[US_USERNAME]} />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  const handleClick = (user) => {
    navigate(OTHER_USER_PROFILE_LOCATION, { state: { user } });
  };

  return (
    <List>
      {chosenUser ? getAppliedUsersListWithChosen() : getAppliedUsersList()}
    </List>
  );
};

export default MyOfferAppliedUsers;
