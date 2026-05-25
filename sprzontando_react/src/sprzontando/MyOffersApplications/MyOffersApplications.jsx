import Container from "@mui/material/Container";

import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { getUserOffersFromDb } from "../../api/getUserOffersFromDb";
import AddOffertButton from "../Offerts/AddOffertButton";
import OffersList from "../Offerts/OffersList";
import NoOffers from "../Offerts/NoOffers";
import { getLoggedUserId } from "../../../utils/utilis";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ACTIVE,
  APPLIED,
  BANNED,
  ENDED,
  IN_PROGRESS,
  LOGIN_LOCATION,
} from "../../../utils/consts";

import NoMyOffersApplications from "./NoMyOffersApplications";
import { getUserOffersApplicationsFromDb } from "../../api/getUserOffersApplicationsFromDb";

function MyOffersApplications() {
  const location = useLocation();
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = getLoggedUserId();
  const mode = location.state?.mode || APPLIED;

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3; //TO DO do constow

    setError(null);
    setIsLoading(true);
    if (!userId) {
      navigate(LOGIN_LOCATION);
      setIsLoading(false);
      return;
    } else {
      const fetchData = async () => {
        const response = await getUserOffersApplicationsFromDb(userId, mode);

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
    }
  }, [mode]);

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
  const getTitle = () => {
    switch (mode) {
      case APPLIED:
        return "Aplikowane oferty:";
        break;
      case ENDED:
        return "Zakończone oferty:";
        break;
      case IN_PROGRESS:
        return "Oferty w trakcie wykonania:";
        break;

      default:
        break;
    }
  };
  return (
    <Grid>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <Typography variant="h3">{getTitle()}</Typography>
          {offers.length > 0 ? (
            <OffersList offers={offers} mode={mode} />
          ) : (
            <NoMyOffersApplications mode={mode} />
          )}
          <AddOffertButton />
        </>
      )}
    </Grid>
  );
}

export default MyOffersApplications;
