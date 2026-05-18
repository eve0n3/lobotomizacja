import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

function OffertTypeSelect({ type, setType, error, helperText }) {
  return (
    <FormControl variant="standard" fullWidth error={error}>
      <InputLabel id="type-select-label">Kategoria</InputLabel>
      <Select
        labelId="type-select-label"
        id="type-select"
        value={type}
        label="Typ"
        onChange={(e) => setType(e.target.value)}
      >
        <MenuItem value={null}>----</MenuItem>
        <MenuItem value={"Mieszkania"}>mieszkanie</MenuItem>
        <MenuItem value={"Biura"}>biuro</MenuItem>
        <MenuItem value={"Garaże"}>garaż</MenuItem>
        <MenuItem value={"Piwnice"}>piwnica</MenuItem>
        <MenuItem value={"Ogrody"}>ogród</MenuItem>
        <MenuItem value={"Magazyny "}>magazyn / przemysł </MenuItem>
        <MenuItem value={"Samochody"}>samochód</MenuItem>
        <MenuItem value={"Inne"}>inne</MenuItem>
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default OffertTypeSelect;
