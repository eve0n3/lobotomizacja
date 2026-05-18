import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import EditOfferForm from "./EditOfferForm";
import BackButton from "../../components/BackButton";
import { Container } from "@mui/material";

function EditOffer() {
  return (
    <>
      <BackButton />
      <Container sx={{ pt: 8, pr: 8 }}>
        <EditOfferForm />
      </Container>
    </>
  );
}

export default EditOffer;
