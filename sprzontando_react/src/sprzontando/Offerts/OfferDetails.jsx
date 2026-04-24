import { useLocation } from "react-router-dom";
import { useState } from "react";

import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Chip,
  Divider,
  Stack,
  Button,
  Tooltip,
  AlertTitle,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";

import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

import {
  OF_ADRESS,
  OF_CITY,
  OF_CREATOR_ID,
  OF_DATE,
  OF_DESCRIPTION,
  OF_PRICE,
  OF_TITLE,
  OF_TYPE,
} from "../../../utils/consts";
import ImagePlaceHolder from "../../components/ImagePlaceHolder";
import { getLoggedUserId } from "../../../utils/utilis";
import { applyForOfferInDb } from "../../api/applyForOfferInDb";
import ErrorAlert from "../../components/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert";

function OfferDetails() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const offer = location.state?.offer;
  if (!offer) {
    setError("Nie znaleziono oferty.");
  }

  const userId = getLoggedUserId();

  const handleApplyButtonClick = async () => {
    // tutaj trze bedzie sprawdzac czy uzytkonik juz sie nie zglosil do tej oferty
    setLoading(true);
    const result = await applyForOfferInDb({
      id_oferty: offer.id,
      id_uzytkownika: userId,
    });

    if (result.success) {
      handleSuccess();
      setLoading(false);
    } else {
      setError("Nie udało się zgłosić się do wykonania ogłoszenia.");
      setLoading(false);
    }
  };
  const handleSuccess = () => {
    setError(null);
    setMessage("Pomyślnie zgłoszono się do wykonania ogłoszenia.");
  };

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      {/* NAGŁÓWEK NAD ZDJĘCIEM */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h3"
            sx={{
              whiteSpace: "normal",
              overflowWrap: "anywhere",
            }}
          >
            {offer[OF_TITLE]}
          </Typography>
        </Box>
        <Stack direction={"row"}>
          <PaymentsOutlinedIcon sx={{ fontSize: 42 }} />
          <Typography variant="h4" color="text.primary">
            {offer[OF_PRICE]} zł
          </Typography>
        </Stack>
      </Box>
      {/* GŁÓWNY UKŁAD STRONY */}
      <Grid container spacing={2}>
        {/* LEWA KOLUMNA: Zdjęcie + Informacje szczegółowe */}

        {/* ZDJĘCIE (PLACEHOLDER) */}
        <Grid size={6} item>
          <ImagePlaceHolder />
        </Grid>

        <Grid size={6} item>
          {/* detale */}

          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center"></Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <PinDropOutlinedIcon sx={{ fontSize: 32 }} color="action" />
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Lokalizacja</Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${offer[OF_CITY]}, ${offer[OF_ADRESS]}`}
                </Typography>
              </Box>
              <CategoryOutlinedIcon sx={{ fontSize: 32 }} color="action" />
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Typ usługi</Typography>
                <Typography variant="body2" color="text.secondary">
                  {offer[OF_TYPE]}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <TodayOutlinedIcon sx={{ fontSize: 32 }} color="action" />
              <Box>
                <Typography sx={{ fontWeight: 600 }}>
                  Data ważności ogłoszenia
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {offer[OF_DATE]}
                </Typography>
              </Box>
            </Stack>
            {userId !== offer[OF_CREATOR_ID] && (
              <Button
                variant="contained"
                onClick={async () => handleApplyButtonClick()}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                Zgłoś się
              </Button>
            )}
          </Stack>
        </Grid>

        <Grid size={12} item>
          <Divider sx={{ my: 4 }} />
        </Grid>
        <Grid size={12} item>
          {/* OPIS */}
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Opis oferty
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              lineHeight: 1.8,
              whiteSpace: "pre-line",
            }}
          >
            {offer[OF_DESCRIPTION]}
          </Typography>
        </Grid>
      </Grid>
      {error && (
        <ErrorAlert
          message={!!message}
          open={error}
          onClose={() => setError(null)}
        />
      )}
      {!error && message && (
        <SuccessAlert
          message={message}
          open={!!message}
          onClose={() => setMessage("")}
        />
      )}
    </Container>
  );
}

export default OfferDetails;
