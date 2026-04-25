import { Grid, LinearProgress, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getOfferAppliedUserFromDb } from "../../api/getOfferAppliedUserFromDb";
import { useState, useEffect } from "react";
import { US_USERNAME } from "../../../utils/consts";

const MyOfferAppliedUsers = ({ offerUsers, offerId }) => {
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

  return (
    <Grid container spacing={2}>
      {users?.map((user) => (
        <Grid item key={user.id}>
          <Typography variant="h6">{user[US_USERNAME]}</Typography>
          <Button variant="contained">Wybierz</Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyOfferAppliedUsers;
