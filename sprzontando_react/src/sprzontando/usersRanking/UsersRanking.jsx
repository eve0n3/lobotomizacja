import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getUsersRankingFromDb } from "../../api/getUsersRankingFromDb";
import LinearProgress from "@mui/material/LinearProgress";
import UsersRankingTable from "./UsersRankingTable";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function UsersRanking() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3; //TO DO do constow

    setError(null);
    setIsLoading(true);

    const fetchData = async () => {
      const response = await getUsersRankingFromDb();

      if (!response.success && retryCount < maxRetries) {
        retryCount++;
        console.log(`Retry ${retryCount}/${maxRetries} in 2s...`);
        setTimeout(() => fetchData(), 2000);
      } else if (response.success) {
        setOffers(response.data);
        setIsLoading(false);
      } else {
        console.error("Max retries exceeded");
        setError("Ładowanie ofert nie powiodło się.");
        setIsLoading(false);
        console.error("Powód:", response.message);
      }
    };

    fetchData().catch(console.error);
  }, []);

  if (error) {
    // TO do obiekt erroru
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
    <Container>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <UsersRankingTable users={users} />
        </>
      )}
    </Container>
  );
}

export default UsersRanking;
