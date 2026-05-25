import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import OffersListItem from "./OffersListItem";
import { listGrid } from "../../styles/offersListItem.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SuccessAlert from "../../components/SuccessAlert";

function OffersList({ offers, mode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(location.state?.message || "");
  const getListItems = (offers, mode) => {
    return offers.map((offer) => (
      <OffersListItem key={offer.id} offer={offer} mode={mode}></OffersListItem>
    ));
  };

  return (
    <>
      <Grid container sx={listGrid} spacing={2}>
        {getListItems(offers, mode)}
      </Grid>
      <SuccessAlert
        message={message}
        open={!!message}
        onClose={() => {
          (setMessage(""),
            navigate(".", {
              replace: true,
              state: { mode: mode, message: null },
            }));
        }}
      />
    </>
  );
}

export default OffersList;
