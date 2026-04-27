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
    if (!getLoggedUserId()) {
      navigate(LOGIN_LOCATION);
    }
  }, [navigate]);

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
      
      const result = await addOffer(offerData);
      if (result.success) {
        handleSuccess();
      } else {
        setSubmitError("Nie można dodać ogłoszenia. Spróbuj ponownie później.");
        setLoading(false);
      }
    }
  };

  const handleSuccess = () => {
    navigate("/");
    setLoading(false);
  };

  return (
    <div className="add-offer-page">
      <div className="login-container" style={{ maxWidth: '500px', width: '100%', padding: '40px 30px' }}>
      
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Dodaj nowe ogłoszenie
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {submitError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <AddOfferFormFields fieldProps={fieldProps} />
          
          <Button
            className="login-button"
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            size="large"
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
            sx={{ mt: 2 }}
          >
            {loading ? "Wysyłanie..." : "Zatwierdź"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddOfferForm;