import moment from "moment";

export const validateAddOfferForm = (setErrors, form) => {
  const newErrors = {};

  if (!form.title.trim()) {
    newErrors.title = "Tytuł jest wymagany";
  }

  if (!form.type || (Array.isArray(form.type) && form.type.length === 0)) {
    newErrors.type = "Kategoria jest wymagana";
  }

  if (!form.price.toString().trim()) {
    newErrors.price = "Cena jest wymagana";
  } else if (isNaN(form.price) || Number(form.price) <= 0) {
    newErrors.price = "Cena musi być większa niż 0";
  } else if (!/^\d+(\.\d{1,2})?$/.test(form.price.toString())) {
    newErrors.price = "Cena może mieć maksymalnie 2 miejsca po przecinku";
  }

  if (!form.city.trim()) {
    newErrors.city = "Miasto jest wymagane";
  }

  if (!form.address.trim()) {
    newErrors.address = "Adres jest wymagany";
  }
  const dateMoment = moment(form.date);
  if (!form.date) {
    newErrors.date = "Data i godzina są wymagane";
  } else if (moment(form.date).isBefore(moment(), "minute")) {
    newErrors.date = "Data nie może być w przeszłości";
  } else if (moment(form.date).isAfter(moment().add(1, "year"))) {
    newErrors.date = "Data nie może być w przyszłości więcej niż rok";
  } else if (!dateMoment.isValid()) {
    newErrors.date = "Nieprawidłowa data i godzina";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
