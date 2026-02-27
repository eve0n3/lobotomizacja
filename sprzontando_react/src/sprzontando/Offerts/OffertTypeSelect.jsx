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
        <MenuItem value={null}>----</MenuItem>
        <MenuItem value={"Sprzątanie mieszkań"}>mieszkanie</MenuItem>
        <MenuItem value={"Sprzątanie biur"}>biuro</MenuItem>
        <MenuItem value={"Sprzątanie garaży"}>garaż</MenuItem>
        <MenuItem value={"Sprzątanie piwnic"}>piwnica</MenuItem>
        <MenuItem value={"Sprzątanie ogrodów"}>ogród</MenuItem>
        <MenuItem value={"Sprzątanie magazynów "}>magazyn / przemysł </MenuItem>
        <MenuItem value={"Sprzątanie samochodu"}>samochód</MenuItem>
      </Select>
    </FormControl>
  );
}

export default OffertTypeSelect;
