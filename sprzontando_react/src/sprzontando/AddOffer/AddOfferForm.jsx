import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LOGIN_LOCATION,
  OF_ADRESS,
  OF_CITY,
  OF_DATE,
  OF_DESCRIPTION,
  OF_ID,
  OF_PRICE,
  OF_TITLE,
  OF_TYPE,
} from "../../../utils/consts";
import { getLoggedUserId } from "../../../utils/utilis";
import { addOffer } from "../../api/addOffer";
import { updateOffer } from "../../api/updateOffer";
import AddOfferFormFields from "./AddOfferFormFields";
import { validateAddOfferForm } from "./validateAddOfferForm";

const parseOfferTypes = (value) =>
  value ? String(value).split(",").map((item) => item.trim()).filter(Boolean) : [];

function AddOfferForm({ mode = "create", initialOffer = null }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    title: initialOffer?.[OF_TITLE] || "",
    city: initialOffer?.[OF_CITY] || "",
    address: initialOffer?.[OF_ADRESS] || "",
    price: initialOffer?.[OF_PRICE] || "",
    type: parseOfferTypes(initialOffer?.[OF_TYPE]),
    date: initialOffer?.[OF_DATE] || null,
    description: initialOffer?.[OF_DESCRIPTION] || "",
  });
  const navigate = useNavigate();
  const isEdit = mode === "edit";

  useEffect(() => {
    if (!getLoggedUserId()) navigate(LOGIN_LOCATION);
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

  const buildOfferData = () => ({
    tytul: form.title,
    miasto: form.city,
    adres: form.address,
    cena: form.price,
    kategoria: Array.isArray(form.type) ? form.type.join(",") : form.type,
    opis: form.description,
    waznosc: form.date,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const isCorrect = validateAddOfferForm(setErrors, form);
    if (!isCorrect) return;

    setLoading(true);
    const payload = buildOfferData();
    const result = isEdit
      ? await updateOffer({
          ...payload,
          id: initialOffer[OF_ID],
          user_id: getLoggedUserId(),
        })
      : await addOffer({ ...payload, id_tworca: getLoggedUserId() });

    if (result.success) {
      navigate(isEdit ? "/myOffers" : "/");
    } else {
      setSubmitError(
        result.message ||
          (isEdit
            ? "Nie mozna zapisac ogloszenia."
            : "Nie mozna dodac ogloszenia. Sprobuj ponownie pozniej."),
      );
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {isEdit ? "Edytuj ogloszenie" : "Dodaj nowe ogloszenie"}
      </Typography>
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {Array.isArray(submitError) ? submitError.join(" ") : submitError}
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
        {isEdit ? "Zapisz zmiany" : "Zatwierdz"}
      </Button>
    </form>
  );
}

export default AddOfferForm;
