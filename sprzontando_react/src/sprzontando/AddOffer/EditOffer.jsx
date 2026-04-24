import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useLocation, useNavigate } from "react-router-dom";

import { MY_OFFERS_LOCATION } from "../../../utils/consts";
import AddOfferForm from "./AddOfferForm";

function EditOffer() {
  const location = useLocation();
  const navigate = useNavigate();
  const offer = location.state?.offer;

  if (!offer) {
    return (
      <Grid>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Nie wybrano ogloszenia do edycji.
        </Alert>
        <Button variant="contained" onClick={() => navigate(MY_OFFERS_LOCATION)}>
          Wroc do listy
        </Button>
      </Grid>
    );
  }

  return <AddOfferForm mode="edit" initialOffer={offer} />;
}

export default EditOffer;
