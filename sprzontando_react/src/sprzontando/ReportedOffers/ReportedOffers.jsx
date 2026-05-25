import Container from "@mui/material/Container";

import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { getIsLoggedUserAdmin } from "../../../utils/utilis";
import { LOGIN_LOCATION, MAX_RETRIES_COUNT } from "../../../utils/consts";
import { getReportedOffersFromDb } from "../../api/getReportedOffersFromDb";
import ReportedOffersList from "./ReportedOffersList";
import NoOffers from "../Offerts/NoOffers";
import NoReportedOffers from "./NoReportedOffers";

function ReportedOffers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = getIsLoggedUserAdmin();

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = MAX_RETRIES_COUNT;

    setError(null);
    setIsLoading(true);
    if (!isAdmin) {
      navigate(LOGIN_LOCATION);
      setIsLoading(false);
      return;
    } else {
      const fetchData = async () => {
        const response = await getReportedOffersFromDb();

        if (!response.success && retryCount < maxRetries) {
          retryCount++;
          console.log(`Retry ${retryCount}/${maxRetries} in 2s...`);
          setTimeout(() => fetchData(), 2000);
        } else if (response.success) {
          setOffers(response.data);
          setIsLoading(false);
          console.log(response.data);
        } else {
          console.error("Max retries exceeded");
          setError("Ładowanie ofert nie powiodło się.");
          setIsLoading(false);
          console.error("Powód:", response.message);
        }
      };
      fetchData().catch(console.error);
    }
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
    <Grid>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          {offers.length > 0 ? (
            <ReportedOffersList offers={offers} />
          ) : (
            <NoReportedOffers />
          )}
        </>
      )}
    </Grid>
  );
}

export default ReportedOffers;
