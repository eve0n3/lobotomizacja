import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

function OffertTypeSelect({ type, setType }) {
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id="type-select-label">Typ</InputLabel>
      <Select
        labelId="type-select-label"
        id="type-select"
        value={type}
        label="Typ"
        helperText=""
        onChange={(e) => setType(e.target.value)}
      >
        <MenuItem value={null}>----</MenuItem>
        <MenuItem value={"mieszkania"}>mieszkanie</MenuItem>
        <MenuItem value={"biura"}>biuro</MenuItem>
        <MenuItem value={"garaże"}>garaż</MenuItem>
        <MenuItem value={"piwnice"}>piwnica</MenuItem>
        <MenuItem value={"ogrody"}>ogród</MenuItem>
        <MenuItem value={"magazyny "}>magazyn / przemysł </MenuItem>
        <MenuItem value={"samochody"}>samochód</MenuItem>
      </Select>
    </FormControl>
  );
}

export default OffertTypeSelect;
