import Container from "@mui/material/Container";

import OffertsSearch from "./OffertsSearch";
import AddOffertButton from "./AddOffertButton";
import { getOffersFromDb } from "../../api/getOffersFromDb";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import OffersList from "./OffersList";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Offerts() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //search states
  const [search, setSearch] = useState(null);
  const [localization, setLocalization] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [type, setType] = useState(null);

  const searchProps = [
    search,
    setSearch,
    localization,
    setLocalization,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    type,
    setType,
    setOffers,
    setIsLoading,
    setError,
    error,
  ];

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3; //TO DO do constow

    setError(null);
    setIsLoading(true);

    const fetchData = async () => {
      const response = await getOffersFromDb({});

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
    <Grid>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <OffertsSearch searchProps={searchProps} />
          <OffersList offers={offers} />
          <AddOffertButton />
        </>
      )}
    </Grid>
  );
}

export default Offerts;
