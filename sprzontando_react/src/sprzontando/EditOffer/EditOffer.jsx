import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import EditOfferForm from "./EditOfferForm";
import BackButton from "../../components/BackButton";
import { Button, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function EditOffer() {
  const location = useLocation();
  const navigate = useNavigate();
  const offer = location.state?.offer;

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ position: "absolute", top: 0, left: 0 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() =>
              navigate(`/offer`, { state: { offer }, replace: true })
            }
          >
            Powrót
          </Button>
        </Box>
      </Box>
      <Container sx={{ pt: 8, pr: 8 }}>
        <EditOfferForm />
      </Container>
    </>
  );
}

export default EditOffer;
