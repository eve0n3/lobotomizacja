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
        onChange={(e) => setType(e.target.value)}
      >
        <MenuItem value={""}>----</MenuItem>
        <MenuItem value={"mieszkanie"}>mieszkanie</MenuItem>
        <MenuItem value={"biuro"}>biuro</MenuItem>
        <MenuItem value={"garaż"}>garaż</MenuItem>
        <MenuItem value={"piwnica"}>piwnica</MenuItem>
        <MenuItem value={"ogród"}>ogród</MenuItem>
        <MenuItem value={"magazyn / przemysł "}>magazyn / przemysł </MenuItem>
        <MenuItem value={"samochód"}>samochód</MenuItem>
      </Select>
    </FormControl>
  );
}

export default OffertTypeSelect;
