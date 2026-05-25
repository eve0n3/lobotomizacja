import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { getIsLoggedUserAdmin } from "../../../utils/utilis";
import { LOGIN_LOCATION, MAX_RETRIES_COUNT } from "../../../utils/consts";
import { getUsersForAdminBan } from "../../api/getUsersForAdminBan";
import AdminUsersList from "./AdminUsersList";
import AdminUsersSearch from "./AdminUsersSearch";
import NoUsers from "./NoUsers";

function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});
  const isAdmin = getIsLoggedUserAdmin();

  useEffect(() => {
    if (!isAdmin) {
      navigate(LOGIN_LOCATION);
      return;
    }
    fetchUsers(searchFilters);
  }, []);

  const fetchUsers = async (filters = {}) => {
    let retryCount = 0;
    const maxRetries = MAX_RETRIES_COUNT;

    setError(null);
    setIsLoading(true);

    const tryFetch = async () => {
      const response = await getUsersForAdminBan(filters);

      if (!response.success && retryCount < maxRetries) {
        retryCount++;
        console.log(`Retry ${retryCount}/${maxRetries} in 2s...`);
        setTimeout(tryFetch, 2000);
      } else if (response.success) {
        setUsers(response.data || []);
        setIsLoading(false);
      } else {
        console.error("Max retries exceeded");
        setError("Ładowanie użytkowników nie powiodło się.");
        setIsLoading(false);
        console.error("Powód:", response.message);
      }
    };

    tryFetch().catch(console.error);
  };

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    fetchUsers(filters);
  };

  const handleUserBanned = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  if (error) {
    return (
      <Grid>
        <Typography variant="h4">{"Wystąpił błąd"}</Typography>
        <Typography variant="h5">{error}</Typography>
        <Button onClick={() => window.location.reload()}>
          Odświerz stronę
        </Button>
      </Grid>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Zarządzanie użytkownikami
      </Typography>
      <AdminUsersSearch onSearch={handleSearch} />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          {users.length > 0 ? (
            <AdminUsersList users={users} onUserBanned={handleUserBanned} />
          ) : (
            <NoUsers />
          )}
        </>
      )}
    </Container>
  );
}

export default AdminUsers;
