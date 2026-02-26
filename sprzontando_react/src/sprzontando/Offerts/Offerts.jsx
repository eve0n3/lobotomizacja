import Container from "@mui/material/Container";

import OffertsSearch from "./OffertsSearch";
import AddOffertButton from "./AddOffertButton";
import { getOffersFromDb } from "../../api/getOffersFromDb";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import OffersList from "./OffersList";

function Offerts() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOffersFromDb({});
        setOffers(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        //await
        //fetch jescze raz
      }
    };

    fetchData().catch(console.error);
  }, []);
  return (
    <Container>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <OffertsSearch />
          <OffersList offers={offers} />
          <AddOffertButton />
        </>
      )}
    </Container>
  );
}

export default Offerts;
