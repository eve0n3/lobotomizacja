import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { listGrid } from "../../styles/offersListItem.styles";
import ReportedOffersListItem from "./ReportedOffersListItem";

function ReportedOffersList({ offers }) {
  const getListItems = (offers) => {
    return offers.map((offer) => (
      <ReportedOffersListItem
        key={offer.id}
        offer={offer}
      ></ReportedOffersListItem>
    ));
  };

  return (
    <Grid container sx={listGrid} spacing={2}>
      {getListItems(offers)}
    </Grid>
  );
}

export default ReportedOffersList;
