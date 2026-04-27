import { useLocation, useNavigate } from "react-router-dom";
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
import PersonIcon from "@mui/icons-material/Person";

import {
  AP_USER_ID,
  LOGIN_LOCATION,
  OF_ADRESS,
  OF_CITY,
  OF_CREATOR_ID,
  OF_DATE,
  OF_DESCRIPTION,
  OF_ID,
  OF_PRICE,
  OF_TITLE,
  OF_TYPE,
  US_USERNAME,
} from "../../../utils/consts";
import ImagePlaceHolder from "../../components/ImagePlaceHolder";
import { getLoggedUserId } from "../../../utils/utilis";
import { applyForOfferInDb } from "../../api/applyForOfferInDb";
import ErrorAlert from "../../components/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert";
import { getOfferAppliedUserFromDb } from "../../api/getOfferAppliedUserFromDb";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MyOfferAppliedUsers from "../MyOffers/MyOfferAppliedUsers";

function OfferDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const offer = location.state?.offer;
  if (!offer) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          Błąd: Nie można wyświetlić szczegółów oferty. Brak danych oferty.
        </Typography>
      </Container>
    );
  }

  const userId = getLoggedUserId();
  const isCreator = userId === offer[OF_CREATOR_ID];

  const handleApplyButtonClick = async () => {
    if (userId === null) {
      navigate(LOGIN_LOCATION);
      return;
    }

    setLoading(true);
    const isAlreadyApplied = await checkIfUserAlreadyApplied();
    if (isAlreadyApplied) {
      setError("Już zgłosiłeś się do tej oferty.");
      setLoading(false);
      return;
    }
    const result = await applyForOfferInDb({
      offerId: offer[OF_ID],
      userId: userId,
    });

    if (result.success) {
      handleSuccess();
      setLoading(false);
    } else {
      setError("Nie udało się zgłosić się do wykonania ogłoszenia.");
      setLoading(false);
    }
  };

  const checkIfUserAlreadyApplied = async () => {
    const result = await getOfferAppliedUserFromDb(offer.id);
    if (result.success) {
      const appliedUsers = result.data;
      return appliedUsers.some((user) => user[AP_USER_ID] === userId);
    } else {
      setError("Nie udało się zgłosić się do wykonania ogłoszenia.");
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setError(null);
    setMessage("Pomyślnie zgłoszono się do wykonania ogłoszenia.");
  };

  return (
    <>
      <BackButton />
      <Container sx={{ pt: 8, pr: 8 }}>
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
            <Stack direction="row" spacing={2} alignItems="center">
              <PermIdentityIcon sx={{ fontSize: 32 }} color="action" />
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Twórca</Typography>
                <Typography variant="body2" color="text.secondary">
                  {offer[US_USERNAME]}
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

              <PinDropOutlinedIcon sx={{ fontSize: 32 }} color="action" />
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Lokalizacja</Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${offer[OF_CITY]}, ${offer[OF_ADRESS]}`}
                </Typography>
              </Box>
            </Stack>

            {!isCreator && (
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
        <Grid size={12} item>
          <Divider sx={{ my: 4 }} />
        </Grid>
        {isCreator && (
          <Grid size={12} item>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Chętni
            </Typography>
            <MyOfferAppliedUsers
              offerUsers={offer?.appliedUsers || null}
              offerId={offer[OF_ID]}
            />
          </Grid>
        )}
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
          onClose={() => setMessage("")}
        />
      )}
    </Container>
  );
}

export default OfferDetails;
