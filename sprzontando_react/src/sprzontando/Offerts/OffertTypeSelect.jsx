import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const OFFER_TYPE_OPTIONS = [
  { value: "mieszkania", label: "Mieszkanie" },
  { value: "biura", label: "Biuro" },
  { value: "gara", label: "Garaz" },
  { value: "piwnice", label: "Piwnica" },
  { value: "ogrody", label: "Ogrod" },
  { value: "magazyny", label: "Magazyn / przemysl" },
  { value: "samochody", label: "Samochod" },
  { value: "okna", label: "Mycie okien" },
  { value: "odkurzanie", label: "Odkurzanie" },
  { value: "zamiatanie", label: "Zamiatanie" },
  { value: "inne", label: "Inne" },
];

const labelsByValue = OFFER_TYPE_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

function OffertTypeSelect({ type, setType, error, helperText, multiple = false }) {
  const value = multiple
    ? Array.isArray(type)
      ? type
      : type
        ? String(type).split(",").filter(Boolean)
        : []
    : type || "";

  const handleChange = (event) => {
    setType(event.target.value || (multiple ? [] : null));
  };

  return (
    <FormControl variant="standard" fullWidth error={error}>
      <InputLabel id="type-select-label">Kategoria</InputLabel>
      <Select
        labelId="type-select-label"
        id="type-select"
        multiple={multiple}
        value={value}
        label="Typ"
        onChange={handleChange}
        renderValue={(selected) => {
          if (!multiple) return labelsByValue[selected] || selected;
          return selected.map((item) => labelsByValue[item] || item).join(", ");
        }}
      >
        {!multiple && <MenuItem value="">----</MenuItem>}
        {OFFER_TYPE_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {multiple && <Checkbox checked={value.includes(option.value)} />}
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default OffertTypeSelect;
