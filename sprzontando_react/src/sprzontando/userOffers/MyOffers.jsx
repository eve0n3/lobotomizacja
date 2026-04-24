import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  EDIT_OFFER_LOCATION,
  LOGIN_LOCATION,
  OF_CITY,
  OF_DATE,
  OF_ID,
  OF_PRICE,
  OF_SELECTED_USERNAME,
  OF_STATUS,
  OF_TITLE,
} from "../../../utils/consts";
import { getLoggedUserId } from "../../../utils/utilis";
import { sqlToPlDateTime } from "../../../utils/utilisTime";
import { getOffersFromDb } from "../../api/getOffersFromDb";

const tabs = [
  { value: "active", label: "Aktywne" },
  { value: "finished", label: "Zakonczone" },
  { value: "banned", label: "Zbanowane" },
];

function MyOffers() {
  const navigate = useNavigate();
  const userId = getLoggedUserId();
  const [status, setStatus] = useState("active");
  const [offers, setOffers] = useState([]);
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
      const result = await getOffersFromDb({ ownerId: userId, status });
      if (result.success) {
        setOffers(result.data || []);
      } else {
        setError(result.message || "Nie udalo sie pobrac ogloszen.");
      }
      setLoading(false);
    };

    loadOffers();
  }, [navigate, status, userId]);

  const openOffer = (offer) => navigate("/offer", { state: { offer } });
  const editOffer = (offer) =>
    navigate(EDIT_OFFER_LOCATION, { state: { offer } });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Moje ogloszenia
      </Typography>
      <Tabs value={status} onChange={(_, value) => setStatus(value)} sx={{ mb: 2 }}>
        {tabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && offers.length === 0 && (
        <Alert severity="info">Brak ogloszen w tej kategorii.</Alert>
      )}
      <Grid container spacing={2}>
        {offers.map((offer) => (
          <Grid item size={{ xs: 12, md: 6 }} key={offer[OF_ID]}>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between" gap={2}>
                  <Typography variant="h6">{offer[OF_TITLE]}</Typography>
                  <Chip size="small" label={offer[OF_STATUS]} />
                </Stack>
                <Typography color="text.secondary">
                  {offer[OF_CITY]} | {offer[OF_PRICE]} zl | wazne do{" "}
                  {sqlToPlDateTime(offer[OF_DATE])}
                </Typography>
                {offer[OF_SELECTED_USERNAME] && (
                  <Typography>
                    Wybrany wykonawca: {offer[OF_SELECTED_USERNAME]}
                  </Typography>
                )}
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" onClick={() => openOffer(offer)}>
                    Szczegoly
                  </Button>
                  {status === "active" && (
                    <Button variant="contained" onClick={() => editOffer(offer)}>
                      Edytuj
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MyOffers;
