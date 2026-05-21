import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { getLoggedUserId } from "../../../utils/utilis";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { addOffer } from "../../api/addOffer";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_LOCATION,
  MY_OFFERS_LOCATION,
  OF_ADRESS,
  OF_CITY,
  OF_DATE,
  OF_DESCRIPTION,
  OF_ID,
  OF_PRICE,
  OF_TITLE,
  OF_TYPE,
} from "../../../utils/consts";
import { Container, Typography } from "@mui/material";
import { validateOfferForm } from "../AddOffer/validateOfferForm";
import EditOfferFormFields from "./EditOfferFormFields";
import { editOfferInDb } from "../../api/editOfferInDb";

function EditOfferForm() {
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
  const location = useLocation();

  const offer = location.state?.offer;

  useEffect(() => {
    !getLoggedUserId() && navigate(LOGIN_LOCATION);
  }, []);

  useEffect(() => {
    if (!offer) {
      return (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h5" color="error">
            Błąd: Nie można edytować oferty. Spróbuj ponownie poźniej.
          </Typography>
        </Container>
      );
    }
    setForm({
      title: offer[OF_TITLE],
      city: offer[OF_CITY],
      address: offer[OF_ADRESS],
      price: offer[OF_PRICE],
      type: offer[OF_TYPE],
      date: offer[OF_DATE],
      description: offer[OF_DESCRIPTION],
    });
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

    const isCorrect = validateOfferForm(setErrors, form);

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
        ogloszenie_id: offer[OF_ID],
      };
      console.log("Submitting offer:", offerData);
      const result = await editOfferInDb(offerData); //edit tu dac
      if (result.success) {
        handleSuccess();
      } else {
        setSubmitError(
          "Nie można edytować ogłoszenia. Spróbuj ponownie później.",
        );
      }
    }
  };
  const handleSuccess = () => {
    console.log("Oferta została edytowana pomyślnie!");
    let newOffer = { ...offer };

    newOffer[OF_TITLE] = form.title;
    newOffer[OF_CITY] = form.city;
    newOffer[OF_ADRESS] = form.address;
    newOffer[OF_PRICE] = form.price;
    newOffer[OF_TYPE] = form.type;
    newOffer[OF_DATE] = form.date;
    newOffer[OF_DESCRIPTION] = form.description;
    newOffer.appliedUsers = null;

    navigate(`/offer`, { state: { offer: newOffer }, replace: true });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edytuj Ogłoszenie
      </Typography>
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}
      <EditOfferFormFields fieldProps={fieldProps} />
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

export default EditOfferForm;
