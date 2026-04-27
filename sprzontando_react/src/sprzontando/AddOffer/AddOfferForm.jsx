import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { getLoggedUserId } from "../../../utils/utilis";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AddOfferFormFields from "./AddOfferFormFields";
import { validateAddOfferForm } from "./validateAddOfferForm";
import { addOffer } from "../../api/addOffer";
import { useNavigate } from "react-router-dom";
import { LOGIN_LOCATION } from "../../../utils/consts";
import { Typography } from "@mui/material";

function AddOfferForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    title: "",
    city: "",
    address: "",
    price: "",
    type: "",
    date: null,
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    !getLoggedUserId() && navigate(LOGIN_LOCATION);
  }, []);

  const handleFieldChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleTypeChange = (value) => {
    setForm((prev) => ({ ...prev, type: value }));
    setErrors((prev) => ({ ...prev, type: null }));
  };

  const fieldProps = {
    setForm,
    form,
    setErrors,
    errors,
    handleFieldChange,
    handleTypeChange,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isCorrect = validateAddOfferForm(setErrors, form);

    if (isCorrect) {
      setLoading(true);
      const offerData = {
        tytul: form.title,
        miasto: form.city,
        adres: form.address,
        cena: form.price,
        kategoria: form.type,
        opis: form.description,
        waznosc: form.date,
        id_tworca: getLoggedUserId(),
      };
      console.log("Submitting offer:", offerData);
      const result = await addOffer(offerData);
      if (result.success) {
        handleSuccess();
      } else {
        setSubmitError("Nie można dodać ogłoszenia. Spróbuj ponownie później.");
      }
    }
  };
  const handleSuccess = () => {
    // tutaj dałabym przekierowanie na strone tego nowego ogłoszenia ale narazie bedzie na listę moich ogłoszeń
    console.log("Oferta została dodana pomyślnie!");
    navigate("/");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dodaj nowe ogłoszenie
      </Typography>
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}
      <AddOfferFormFields fieldProps={fieldProps} />
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
}

export default AddOfferForm;
