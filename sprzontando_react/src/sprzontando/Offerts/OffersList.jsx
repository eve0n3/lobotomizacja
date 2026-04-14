import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import OffersListItem from "./OffersListItem";
import { listGrid } from "../../styles/offersListItem.styles";

function OffersList({ offers }) {
  console.log(offers);

  const getListItems = (offers) => {
    return offers.map((offer) => (
      <OffersListItem key={offer.id} offer={offer}></OffersListItem>
    ));
  };

  return (
    <Grid container sx={listGrid} spacing={2}>
      {getListItems(offers)}
    </Grid>
  );
}

export default OffersList;
