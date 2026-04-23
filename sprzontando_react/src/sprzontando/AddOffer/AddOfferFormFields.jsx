import TextField from "@mui/material/TextField";
import moment from "moment";
import OffertTypeSelect from "../Offerts/OffertTypeSelect";
import { DateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import Grid from "@mui/material/Grid";

const AddOfferFormFields = ({ fieldProps }) => {
  const {
    setForm,
    form,
    setErrors,
    errors,
    handleFieldChange,
    handleTypeChange,
  } = fieldProps;
  // Input filtering functions
  const handleCityKeyPress = (e) => {
    // Allow only letters (including Polish), digits, and spaces
    if (
      !/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }
  };

  const handleAddressKeyPress = (e) => {
    // Allow only letters (including Polish), digits, dots, hyphens, spaces, slashes
    if (
      !/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s.\-,/]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }
  };

  const handlePriceKeyPress = (e) => {
    // Allow only digits and comma
    if (
      !/[0-9.]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }
    const dotIndex = e.target.value.indexOf(".");
    if (dotIndex !== -1 && e.target.value.length - dotIndex > 2) {
      e.preventDefault();
    }
  };
  return (
    <>
      <TextField
        label="Tytuł"
        fullWidth
        value={form.title}
        error={!!errors.title}
        helperText={errors.title}
        onChange={handleFieldChange("title")}
        inputProps={{ maxLength: 64 }}
        sx={{ mb: 2 }}
      />
      <Grid sx={{ mb: 2 }}>
        <OffertTypeSelect
          type={form.type}
          setType={handleTypeChange}
          error={!!errors.type}
          helperText={errors.type}
        />
      </Grid>

      <TextField
        label="Cena (zł)"
        fullWidth
        value={form.price || ""}
        error={!!errors.price}
        helperText={errors.price}
        inputProps={{
          maxLength: 9,
        }}
        onChange={handleFieldChange("price")}
        onKeyPress={handlePriceKeyPress}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Miasto"
        fullWidth
        value={form.city}
        error={!!errors.city}
        helperText={errors.city}
        onChange={handleFieldChange("city")}
        onKeyPress={handleCityKeyPress}
        inputProps={{ maxLength: 64 }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Adres"
        fullWidth
        value={form.address}
        error={!!errors.address}
        helperText={errors.address}
        onChange={handleFieldChange("address")}
        onKeyPress={handleAddressKeyPress}
        inputProps={{ maxLength: 255 }}
        sx={{ mb: 2 }}
      />

      <DateTimePicker
        label="Wybierz datę i godzinę"
        value={form.date ? moment(form.date) : null}
        onChange={(newValue) => {
          setForm((prev) => ({
            ...prev,
            date: newValue ? newValue.format("YYYY-MM-DD HH:mm:ss") : null,
          }));
          setErrors((prev) => ({ ...prev, date: null }));
        }}
        format="DD.MM.YYYY HH:mm"
        disablePast
        maxDate={moment().add(1, "year")}
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
        value={form.description}
        onChange={handleFieldChange("description")}
        inputProps={{ maxLength: 500 }}
        sx={{ mb: 2 }}
      />
    </>
  );
};

export default AddOfferFormFields;
