import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";

import {
  AP_USER_ID,
  HOME_LOCATION,
  LOGIN_LOCATION,
  OF_ADRESS,
  OF_CITY,
  OF_CREATOR_ID,
  OF_DATE,
  OF_DESCRIPTION,
  OF_ID,
  OF_PRICE,
  OF_SELECTED_USER_ID,
  OF_STATUS,
  OF_TITLE,
  OF_TYPE,
} from "../../../utils/consts";
import { getLoggedUserId, isLoggedUserAdmin } from "../../../utils/utilis";
import { sqlToPlDateTime } from "../../../utils/utilisTime";
import { banOffer, reportOffer } from "../../api/adminApi";
import { applyForOfferInDb } from "../../api/applyForOfferInDb";
import { getOfferAppliedUserFromDb } from "../../api/getOfferAppliedUserFromDb";
import {
  chooseOfferPerformer,
  getOfferApplications,
  rateOfferPerformer,
} from "../../api/offerApplicationsApi";
import ImagePlaceHolder from "../../components/ImagePlaceHolder";

const ratingLabels = {
  1: "Bardzo slabo",
  2: "Slabo",
  3: "Poprawnie",
  4: "Dobrze",
  5: "Bardzo dobrze",
};

function OfferDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(location.state?.offer || null);
  const [loading, setLoading] = useState(false);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selection, setSelection] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [rating, setRating] = useState(5);
  const [ratingDescription, setRatingDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userId = getLoggedUserId();
  const numericUserId = Number(userId);
  const isOwner = useMemo(
    () => offer && Number(offer[OF_CREATOR_ID]) === numericUserId,
    [numericUserId, offer],
  );
  const admin = isLoggedUserAdmin();
  const offerStatus = offer?.[OF_STATUS] || "active";
  const selectedUserId = Number(selection?.id_wykon || offer?.[OF_SELECTED_USER_ID]);

  useEffect(() => {
    if (!offer || !userId || isOwner) return;

    const checkApplication = async () => {
      const result = await getOfferAppliedUserFromDb(offer[OF_ID]);
      if (result.success) {
        setAlreadyApplied(
          (result.data || []).some(
            (user) => Number(user[AP_USER_ID]) === Number(userId),
          ),
        );
      }
    };

    checkApplication();
  }, [isOwner, offer, userId]);

  const loadApplications = useCallback(async () => {
    if (!offer || !isOwner) return;
    setApplicationsLoading(true);
    const result = await getOfferApplications(offer[OF_ID]);
    if (result.success) {
      setApplications(result.data || []);
      setSelection(result.selection || null);
    } else {
      setError(result.message || "Nie udalo sie pobrac kandydatow.");
    }
    setApplicationsLoading(false);
  }, [isOwner, offer]);

  useEffect(() => {
    queueMicrotask(loadApplications);
  }, [loadApplications]);

  if (!offer) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Nie wybrano ogloszenia.
        </Alert>
        <Button variant="contained" onClick={() => navigate(HOME_LOCATION)}>
          Wroc do listy
        </Button>
      </Container>
    );
  }

  const handleApplyButtonClick = async () => {
    setError("");
    setMessage("");

    if (!userId) {
      navigate(LOGIN_LOCATION);
      return;
    }

    setLoading(true);
    const result = await applyForOfferInDb({
      offerId: offer[OF_ID],
      userId,
    });

    if (result.success) {
      setAlreadyApplied(true);
      setMessage(result.message || "Zgloszono do wykonania ogloszenia.");
    } else {
      setError(result.message || "Nie udalo sie zglosic do ogloszenia.");
    }
    setLoading(false);
  };

  const handleChoose = async (performerId) => {
    setError("");
    setMessage("");
    const result = await chooseOfferPerformer({
      offerId: offer[OF_ID],
      ownerId: userId,
      performerId,
    });

    if (result.success) {
      setMessage(result.message);
      setOffer((prev) => ({ ...prev, [OF_STATUS]: "finished" }));
      await loadApplications();
    } else {
      setError(result.message || "Nie udalo sie wybrac wykonawcy.");
    }
  };

  const handleRate = async () => {
    setError("");
    setMessage("");
    const result = await rateOfferPerformer({
      offerId: offer[OF_ID],
      ownerId: userId,
      rating,
      label: ratingLabels[rating],
      description: ratingDescription,
    });

    if (result.success) {
      setMessage(result.message);
      setRatingDescription("");
      await loadApplications();
    } else {
      setError(result.message || "Nie udalo sie zapisac oceny.");
    }
  };

  const handleReport = async () => {
    setError("");
    setMessage("");
    if (!userId) {
      navigate(LOGIN_LOCATION);
      return;
    }

    const result = await reportOffer({
      offerId: offer[OF_ID],
      userId,
      reason: reportReason,
    });

    if (result.success) {
      setMessage(result.message);
      setReportOpen(false);
      setReportReason("");
    } else {
      setError(result.message || "Nie udalo sie zglosic ogloszenia.");
    }
  };

  const handleAdminBan = async () => {
    setError("");
    setMessage("");
    const result = await banOffer({ adminId: userId, offerId: offer[OF_ID], ban: 1 });

    if (result.success) {
      setOffer((prev) => ({ ...prev, ban: 1, [OF_STATUS]: "banned" }));
      setMessage("Ogloszenie zostalo zbanowane.");
    } else {
      setError(result.message || "Nie udalo sie zbanowac ogloszenia.");
    }
  };

  const canApply =
    !isOwner &&
    offerStatus !== "banned" &&
    !alreadyApplied &&
    !selectedUserId;

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      <Stack spacing={3}>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ overflowWrap: "anywhere" }}>
              {offer[OF_TITLE]}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip label={offerStatus} />
              {selectedUserId ? <Chip color="success" label="wykonawca wybrany" /> : null}
            </Stack>
          </Box>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            {admin && offerStatus !== "banned" && (
              <Button color="error" variant="contained" onClick={handleAdminBan}>
                Banuj
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<ReportOutlinedIcon />}
              onClick={() => setReportOpen((open) => !open)}
            >
              Zglos
            </Button>
          </Stack>
        </Stack>

        <Collapse in={reportOpen}>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Powod zgloszenia"
                value={reportReason}
                onChange={(event) => setReportReason(event.target.value)}
                inputProps={{ maxLength: 255 }}
                multiline
                minRows={2}
              />
              <Button variant="contained" onClick={handleReport}>
                Przekaz administratorowi
              </Button>
            </Stack>
          </Paper>
        </Collapse>

        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, md: 5 }}>
            <ImagePlaceHolder />
          </Grid>
          <Grid item size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <PinDropOutlinedIcon sx={{ fontSize: 32 }} color="action" />
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>Lokalizacja</Typography>
                    <Typography color="text.secondary">
                      {offer[OF_CITY]}, {offer[OF_ADRESS]}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CategoryOutlinedIcon sx={{ fontSize: 32 }} color="action" />
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>Typ uslugi</Typography>
                    <Typography color="text.secondary">{offer[OF_TYPE]}</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TodayOutlinedIcon sx={{ fontSize: 32 }} color="action" />
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>Wazne do</Typography>
                    <Typography color="text.secondary">
                      {sqlToPlDateTime(offer[OF_DATE])}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <PaymentsOutlinedIcon sx={{ fontSize: 32 }} color="action" />
                  <Typography variant="h4">{offer[OF_PRICE]} zl</Typography>
                </Stack>
                {!isOwner && (
                  <Button
                    variant="contained"
                    onClick={handleApplyButtonClick}
                    disabled={loading || !canApply}
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    {alreadyApplied ? "Juz zgloszono" : "Zglos sie"}
                  </Button>
                )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Divider />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Opis oferty
          </Typography>
          <Typography sx={{ lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {offer[OF_DESCRIPTION]}
          </Typography>
        </Box>

        {isOwner && (
          <Paper sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h5">Kandydaci do wykonania</Typography>
              {applicationsLoading && <CircularProgress />}
              {!applicationsLoading && applications.length === 0 && (
                <Alert severity="info">Brak zgloszen do tej oferty.</Alert>
              )}
              {selection && (
                <Alert severity="success">
                  Wybrany wykonawca: {selection.nazwa}
                  {selection.ocena
                    ? ` | ocena: ${selection.ocena} (${selection.ocena_slowna || ""})`
                    : " | oczekuje na ocene"}
                </Alert>
              )}
              {applications.length > 0 && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Uzytkownik</TableCell>
                      <TableCell>Srednia</TableCell>
                      <TableCell>Wykonane</TableCell>
                      <TableCell>Zgloszenie</TableCell>
                      <TableCell>Akcje</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.map((candidate) => (
                      <TableRow key={candidate.application_id}>
                        <TableCell>
                          <Typography>{candidate.nazwa}</Typography>
                          <Collapse in={expandedUser === candidate.id_chetnego}>
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Ostatnie zlecenia:
                              </Typography>
                              {(candidate.recent_jobs || []).length === 0 && (
                                <Typography variant="body2">Brak ocen.</Typography>
                              )}
                              {(candidate.recent_jobs || []).map((job) => (
                                <Typography key={`${job.tytul}-${job.ocena_data}`} variant="body2">
                                  {job.tytul}: {job.ocena}/5 {job.ocena_slowna || ""}
                                </Typography>
                              ))}
                            </Box>
                          </Collapse>
                        </TableCell>
                        <TableCell>
                          <Rating
                            value={Number(candidate.avgocena)}
                            precision={0.1}
                            readOnly
                          />
                        </TableCell>
                        <TableCell>{candidate.completed_count}</TableCell>
                        <TableCell>{sqlToPlDateTime(candidate.zgloszenie)}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() =>
                                setExpandedUser((current) =>
                                  current === candidate.id_chetnego
                                    ? null
                                    : candidate.id_chetnego,
                                )
                              }
                            >
                              Szczegoly
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              disabled={!!selection}
                              onClick={() => handleChoose(candidate.id_chetnego)}
                            >
                              Wybierz
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {selection && !selection.ocena && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Typography variant="h6">Ocena pracy</Typography>
                    <Rating
                      value={rating}
                      onChange={(_, value) => setRating(value || 1)}
                    />
                    <Typography>{ratingLabels[rating]}</Typography>
                    <TextField
                      label="Opis oceny"
                      value={ratingDescription}
                      onChange={(event) => setRatingDescription(event.target.value)}
                      inputProps={{ maxLength: 255 }}
                      helperText={`${ratingDescription.length}/255`}
                      multiline
                      minRows={3}
                    />
                    <Button variant="contained" onClick={handleRate}>
                      Zapisz ocene
                    </Button>
                  </Stack>
                </Paper>
              )}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}

export default OfferDetails;
