import moment from "moment";

export const validateAddOfferForm = (setErrors, form) => {
  const newErrors = {};

  if (!form.title.trim()) {
    newErrors.title = "Tytuł jest wymagany";
  }

  if (!form.type) newErrors.type = "Kategoria jest wymagana";

  if (!form.price.toString().trim()) {
    newErrors.price = "Cena jest wymagana";
  } else if (isNaN(form.price) || Number(form.price) <= 0) {
    newErrors.price = "Cena musi być większa niż 0";
  }

  if (!form.city.trim()) {
    newErrors.city = "Miasto jest wymagane";
  }

  if (!form.address.trim()) {
    newErrors.address = "Adres jest wymagany";
  }

  if (!form.date) {
    newErrors.date = "Data i godzina są wymagane";
  } else if (moment(form.date).isBefore(moment(), "minute")) {
    newErrors.date = "Data nie może być w przeszłości";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
