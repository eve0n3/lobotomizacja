import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LOGIN_LOCATION,
  OF_CITY,
  OF_ID,
  OF_PRICE,
  OF_SELECTED_USER_ID,
  OF_STATUS,
  OF_TITLE,
} from "../../../utils/consts";
import { getLoggedUserId } from "../../../utils/utilis";
import { getOffersFromDb } from "../../api/getOffersFromDb";

function OfferCard({ offer, userId, onOpen }) {
  const selected = Number(offer[OF_SELECTED_USER_ID]) === Number(userId);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Typography variant="h6">{offer[OF_TITLE]}</Typography>
          <Chip
            size="small"
            color={selected ? "success" : "default"}
            label={selected ? "Wybrano Ciebie" : offer[OF_STATUS]}
          />
        </Stack>
        <Typography color="text.secondary">
          {offer[OF_CITY]} | {offer[OF_PRICE]} zl
        </Typography>
        <Button variant="outlined" onClick={() => onOpen(offer)}>
          Szczegoly
        </Button>
      </Stack>
    </Paper>
  );
}

function MyApplications() {
  const navigate = useNavigate();
  const userId = getLoggedUserId();
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate(LOGIN_LOCATION);
      return;
    }

    const loadOffers = async () => {
      setLoading(true);
      setError("");
      const [appliedResult, selectedResult] = await Promise.all([
        getOffersFromDb({ appliedUserId: userId }),
        getOffersFromDb({ selectedUserId: userId }),
      ]);

      if (appliedResult.success && selectedResult.success) {
        setAppliedOffers(appliedResult.data || []);
        setSelectedOffers(selectedResult.data || []);
      } else {
        setError(
          appliedResult.message ||
            selectedResult.message ||
            "Nie udalo sie pobrac zgloszen.",
        );
      }
      setLoading(false);
    };

    loadOffers();
  }, [navigate, userId]);

  const openOffer = (offer) => navigate("/offer", { state: { offer } });

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Moje zgloszenia
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Oferty, do ktorych sie zglosilem
      </Typography>
      {appliedOffers.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Nie masz jeszcze zgloszen.
        </Alert>
      )}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {appliedOffers.map((offer) => (
          <Grid item size={{ xs: 12, md: 6 }} key={`applied-${offer[OF_ID]}`}>
            <OfferCard offer={offer} userId={userId} onOpen={openOffer} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Oferty, w ktorych zostalem wybrany
      </Typography>
      {selectedOffers.length === 0 && (
        <Alert severity="info">Nie wybrano Cie jeszcze do zadnej oferty.</Alert>
      )}
      <Grid container spacing={2}>
        {selectedOffers.map((offer) => (
          <Grid item size={{ xs: 12, md: 6 }} key={`selected-${offer[OF_ID]}`}>
            <OfferCard offer={offer} userId={userId} onOpen={openOffer} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MyApplications;
