import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

function OffertTypeSelect({ type, setType, error, helperText }) {
  return (
    <FormControl variant="outlined" fullWidth error={error}>
      <InputLabel id="type-select-label">Kategoria</InputLabel>
      <Select
        labelId="type-select-label"
        id="type-select"
        value={type}
        label="Kategoria"
        onChange={(e) => setType(e.target.value)}
        sx={{textAlign: "left",}}
      >
        <MenuItem value={null}>----</MenuItem>
        <MenuItem value={"mieszkania"}>mieszkanie</MenuItem>
        <MenuItem value={"biura"}>biuro</MenuItem>
        <MenuItem value={"garaże"}>garaż</MenuItem>
        <MenuItem value={"piwnice"}>piwnica</MenuItem>
        <MenuItem value={"ogrody"}>ogród</MenuItem>
        <MenuItem value={"magazyny "}>magazyn / przemysł </MenuItem>
        <MenuItem value={"samochody"}>samochód</MenuItem>
        <MenuItem value={"inne"}>inne</MenuItem>
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default OffertTypeSelect;
