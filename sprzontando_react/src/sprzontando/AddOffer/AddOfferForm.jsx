import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { getLoggedUserId } from "../../../utils/utilis";
import OffertTypeSelect from "../Offerts/OffertTypeSelect";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function AddOfferForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [title, setTitle] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [price, setPrice] = useState();
  const [type, setType] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const userId = getLoggedUserId();

  /* $tytul = $data['tytul']; max 64 
    $miasto = $data['miasto']; max 100 bez znaków specjalnych
    $adres = $data['adres']; max 255 . - /
    $cena = $data['cena']; 
    $kategoria = $data['kategoria']; dropdown 
    $opis = $data['opis']; max 500
    data sql datetime
    id osoby zglasz -> cookie

    wszystko wymagane oprócz opis
    {
    'tytul':"",

    }

    */
  const validateData = () => {
    const newErrors = {};

    if (!title) newErrors.title = "Tytuł jest wymagany";
    if (!type) newErrors.type = "Kategoria jest wymagana";
    if (!price) newErrors.price = "Cena jest wymagana";
    else if (isNaN(price) || Number(price) <= 0)
      newErrors.price = "Cena musi być liczbą większą od 0";
    if (!city) newErrors.city = "Miasto jest wymagane";
    if (!address) newErrors.address = "Adres jest wymagany";
    if (!date) newErrors.date = "Data i godzina są wymagane";
    //TODO DODAĆ WSZYSKIE POLA, sprawdzanie daty,i długości
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isCorrect = validateData();

    if (isCorrect) {
      setLoading(true);

      setLoading(false);
    }
  };

  return (
    <Grid>
      <form onSubmit={handleSubmit}>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <TextField
          label="Tytuł"
          fullWidth
          error={!!errors.title}
          helperText={errors.title}
          onChange={(e) => {
            setTitle(e.target.value === "" ? null : e.target.value);
            setErrors((prev) => ({ ...prev, title: null }));
          }}
          sx={{ mb: 2 }}
        />

        <OffertTypeSelect
          type={type}
          setType={(val) => {
            setType(val);
            setErrors((prev) => ({ ...prev, type: null }));
          }}
          error={!!errors.type}
          helperText={errors.type}
        />

        <TextField
          label="Cena (zł)"
          fullWidth
          type="number"
          error={!!errors.price}
          helperText={errors.price}
          onChange={(e) => {
            setPrice(e.target.value === "" ? null : e.target.value);
            setErrors((prev) => ({ ...prev, price: null }));
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Miasto"
          fullWidth
          error={!!errors.city}
          helperText={errors.city}
          onChange={(e) => {
            setCity(e.target.value === "" ? null : e.target.value);
            setErrors((prev) => ({ ...prev, city: null }));
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Adres"
          fullWidth
          error={!!errors.address}
          helperText={errors.address}
          onChange={(e) => {
            setAddress(e.target.value === "" ? null : e.target.value);
            setErrors((prev) => ({ ...prev, address: null }));
          }}
          sx={{ mb: 2 }}
        />

        <DateTimePicker
          label="Wybierz datę i godzinę"
          value={date ? moment(date) : null}
          onChange={(newValue) => {
            setDate(newValue ? newValue.format("YYYY-MM-DD HH:mm:ss") : null);
            setErrors((prev) => ({ ...prev, date: null }));
          }}
          disablePast
          format="DD.MM.YYYY HH:mm"
          ampm={false}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!errors.date,
              helperText: errors.date,
              sx: { mb: 2 },
            },
          }}
        />

        <TextField
          label="Opis"
          fullWidth
          multiline
          rows={4}
          onChange={(e) =>
            setDescription(e.target.value === "" ? null : e.target.value)
          }
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
    </Grid>
  );
}

export default AddOfferForm;
