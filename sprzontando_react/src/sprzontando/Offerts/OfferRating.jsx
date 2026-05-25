import {
  Button,
  CircularProgress,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ENDED,
  MY_OFFERS_LOCATION,
  OF_ID,
  OF_PRICE,
  OF_RATING,
  OF_RATING_DESCRIPTION,
} from "../../../utils/consts";
import { useState } from "react";
import { setOfferRatingInDb } from "../../api/setOfferRatingInDb";
import { useNavigate } from "react-router-dom";

const OfferRating = ({ isCreator, offer, setError }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    rating: 0,
    description: "",
  });
  const getRatingForm = (isCreator, offer) => {
    console.log(offer);
    if (offer[OF_RATING] != null) {
      return getRating(offer[OF_RATING], offer[OF_RATING_DESCRIPTION]);
    }

    return (
      <form onSubmit={handleRatingSubmit}>
        <Rating
          name="rating"
          value={form.rating}
          precision={1}
          onChange={(_, newValue) =>
            setForm((prev) => ({ ...prev, rating: newValue ?? 0 }))
          }
          sx={{ mb: 2, fontSize: 32 }}
        />
        <TextField
          label="Opis oceny"
          fullWidth
          multiline
          minRows={3}
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          inputProps={{ maxLength: 255 }}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          Zatwierdź
        </Button>
      </form>
    );
  };
  const handleRatingSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Submitting rating:", form);
    const response = await setOfferRatingInDb(
      offer[OF_ID],
      form.rating,
      form.description,
    );
    if (response.success) {
      navigate(MY_OFFERS_LOCATION, {
        state: { mode: ENDED, message: "Pomyślnie oceniono pracę." },
      });
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  const getNoRating = () => {
    return (
      <Typography variant="body1" color="textSecondary">
        Twoja praca nie została jeszcze oceniona.
      </Typography>
    );
  };
  const getRating = (rating, ratingDescription) => {
    if (rating === null) {
      return getNoRating();
    }

    return (
      <Stack spacing={2}>
        <Rating name="read-only" value={rating} precision={0.1} readOnly />
        <Typography variant="body1">
          {ratingDescription || "Brak opisu oceny."}
        </Typography>
      </Stack>
    );
  };
  return (
    <Stack>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Ocena pracy
      </Typography>
      {!isCreator
        ? getRating(offer[OF_RATING], offer[OF_RATING_DESCRIPTION])
        : getRatingForm(isCreator, offer)}
    </Stack>
  );
};

export default OfferRating;
