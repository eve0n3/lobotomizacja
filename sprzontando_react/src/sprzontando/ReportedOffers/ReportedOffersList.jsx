import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { listGrid } from "../../styles/offersListItem.styles";
import ReportedOffersListItem from "./ReportedOffersListItem";
import { useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert";
import { useLocation, useNavigate } from "react-router-dom";

function ReportedOffersList({ offers }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(location.state?.message || "");
  const [error, setError] = useState(null);

  const getListItems = (offers) => {
    return offers.map((offer) => (
      <ReportedOffersListItem
        key={offer.id}
        offer={offer}
        setMessage={setMessage}
        setError={setError}
      ></ReportedOffersListItem>
    ));
  };

  return (
    <>
      <Grid container sx={listGrid} spacing={2}>
        {getListItems(offers)}
      </Grid>
      {error && (
        <ErrorAlert
          message={error}
          open={error}
          onClose={() => setError(null)}
        />
      )}
      {!error && message && (
        <SuccessAlert
          message={message}
          open={!!message}
          onClose={() => {
            (setMessage(""),
              navigate(".", {
                replace: true,
                state: { ...location.state, message: null },
              }));
          }}
        />
      )}
    </>
  );
}

export default ReportedOffersList;
