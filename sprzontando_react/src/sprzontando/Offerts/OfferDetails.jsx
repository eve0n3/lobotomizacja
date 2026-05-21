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
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

import {
  ACTIVE,
  AP_USER_ID,
  BANNED,
  EDIT_OFFER_LOCATION,
  ENDED,
  HOME_LOCATION,
  LOGIN_LOCATION,
  MY_OFFERS_LOCATION,
  OF_ADRESS,
  OF_CITY,
  OF_CREATOR_ID,
  OF_DATE,
  OF_DESCRIPTION,
  OF_ID,
  OF_PRICE,
  OF_TITLE,
  OF_TYPE,
  REPORTED_OFFERS_LOCATION,
  ROF_COUNT,
  US_USERNAME,
} from "../../../utils/consts";
import ImagePlaceHolder from "../../components/ImagePlaceHolder";
import { getIsLoggedUserAdmin, getLoggedUserId } from "../../../utils/utilis";
import { applyForOfferInDb } from "../../api/applyForOfferInDb";
import ErrorAlert from "../../components/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert";
import { getOfferAppliedUserFromDb } from "../../api/getOfferAppliedUserFromDb";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MyOfferAppliedUsers from "../MyOffers/MyOfferAppliedUsers";
import {
  adminBanGrid,
  adminGrid,
  adminOkGrid,
  banIcon,
  biggerIcon,
  okIcon,
} from "../../styles/offersListItem.styles";
import { FONT_SIZE_XL } from "../../../utils/styleConsts";
import { flexCentered } from "../../styles/AppStyle";
import { banReportedOfferInDb } from "../../api/banReportedOfferInDb";
import HoverFilledIconButton from "../../components/HoverFilledIconButton";
import { okReportedOfferInDb } from "../../api/okReportedOfferInDb";
import BackButton from "../../components/BackButton";
import FlagIcon from "@mui/icons-material/Flag";
import { reportOfferInDb } from "../../api/reportOfferInDb";

function OfferDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [banned, setBanned] = useState(false);
  const [discarded, setDiscarded] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [isChosen, setIsChosen] = useState(false);

  const offer = location.state?.offer;
  const mode = location.state?.mode || ACTIVE;
  if (!offer) {
    console.log("location.state", location.state);
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
  const isAdmin = getIsLoggedUserAdmin();

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
  const handleBanClick = async (id) => {
    const result = await banReportedOfferInDb(id);
    if (result.success) {
      setBanned(true);
      setMessage(result.message);
      navigate(HOME_LOCATION, {
        replace: true,
        state: { message: "Pomyślnie zbanowano ogłoszenie" },
      });
    } else {
      setBanned(false);
      setError(result.message);
    }
  };
  const handleDiscardClick = async (id) => {
    const result = await okReportedOfferInDb(id);
    if (result.success) {
      setDiscarded(true);
      setMessage(result.message);
      navigate(HOME_LOCATION, {
        replace: true,
        state: { message: "Pomyślnie odrzucono zgłoszenia" },
      });
    } else {
      setDiscarded(false);
      setError(result.message);
    }
  };

  const handleSuccess = () => {
    setError(null);
    setMessage("Pomyślnie zgłoszono się do wykonania ogłoszenia.");
  };
  const getAdminButtons = () => {
    return (
      <Grid spacing={2} sx={flexCentered} container>
        {" "}
        <Grid item size={4} sx={{ pr: "10px" }}>
          <Tooltip title="ilość zgłoszeń" arrow>
            <Box sx={adminGrid}>
              <OutlinedFlagIcon sx={biggerIcon} />
              <Typography sx={{ fontSize: FONT_SIZE_XL }}>
                {offer[ROF_COUNT]}
              </Typography>
            </Box>
          </Tooltip>
        </Grid>
        {offer[ROF_COUNT] > 0 && (
          <Grid item size={4} sx={adminOkGrid} disabled={banned || discarded}>
            <Tooltip title="odrzuć zgłoszenia" arrow>
              <HoverFilledIconButton
                OutlineIcon={ThumbUpOutlinedIcon}
                FilledIcon={ThumbUpIcon}
                onClick={() => handleDiscardClick(offer[OF_ID])}
                sx={okIcon}
              />
            </Tooltip>
          </Grid>
        )}
        <Grid item size={4} sx={adminBanGrid}>
          <Tooltip title="zbanuj" arrow>
            <HoverFilledIconButton
              OutlineIcon={ThumbDownAltOutlinedIcon}
              FilledIcon={ThumbDownAltIcon}
              onClick={() => handleBanClick(offer[OF_ID])}
              sx={banIcon}
            />
          </Tooltip>
        </Grid>
      </Grid>
    );
  };
  const handleReportClick = async () => {
    if (userId == null) {
      navigate(LOGIN_LOCATION);
      return;
    }
    const response = await reportOfferInDb(offer[OF_ID]);
    if (response.success === true) {
      setIsReported(true);
      setMessage(response.message);
    } else {
      setIsReported(false);
      setError("Nie udało się zgłosić ogłoszenia.");
    }
  };

  const handleEditClick = () => {
    navigate(EDIT_OFFER_LOCATION, { state: { offer }, replace: true });
  };
  const getEditOrReportIcon = (mode) => {
    if (mode === (BANNED || ENDED)) {
      return;
    }
    if (isCreator && isAdmin) {
      return (
        <Tooltip title="edytuj" arrow>
          {" "}
          <IconButton onClick={handleEditClick}>
            <EditIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Tooltip>
      );
    } else if (isAdmin) return;

    return isCreator ? (
      <Tooltip title="edytuj" arrow>
        <IconButton onClick={handleEditClick}>
          <EditIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="ilość zgłoszeń" arrow>
        <IconButton disabled={isReported} onClick={handleReportClick}>
          <FlagIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      <BackButton />
      <Container sx={{ pt: 8, pr: 8 }}>
        {/* NAGŁÓWEK NAD ZDJĘCIEM */}

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h3"
              sx={{
                whiteSpace: "normal",
                overflowWrap: "anywhere",
                flexGrow: 1,
              }}
            >
              {offer[OF_TITLE]}
            </Typography>
            <Box sx={flexCentered}>
              {isAdmin && !isCreator && getAdminButtons()}
              {getEditOrReportIcon(mode)}
            </Box>
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
                setIsChosen={setIsChosen}
                isChosen={isChosen}
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
    </>
  );
}

export default OfferDetails;
