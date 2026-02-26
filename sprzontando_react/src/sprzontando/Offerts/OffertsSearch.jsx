import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import OffertTypeSelect from "./OffertTypeSelect";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function OffertsSearch() {
  const [search, setSearch] = useState("");
  const [localization, setLocalization] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  return (
    <Container>
      <form>
        <Grid
          container
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
          spacing={2}
        >
          <Grid item size={4} sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              label="Wyszukaj ofarty"
              variant="standard"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item size={2}>
            <TextField
              fullWidth
              label="Lokalizacja"
              variant="standard"
              value={localization}
              onChange={(e) => setLocalization(e.target.value)}
            />
          </Grid>
          <Grid item size={2}>
            <TextField
              fullWidth
              label="Cena"
              variant="standard"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item size={2}>
            <OffertTypeSelect type={type} setType={setType} />
          </Grid>
          <Grid item size={2}>
            <Button type="submit" variant="contained">
              wyszukaj
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default OffertsSearch;
