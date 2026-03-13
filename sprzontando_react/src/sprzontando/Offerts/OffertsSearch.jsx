import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import OffertTypeSelect from "./OffertTypeSelect";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { getOffersFromDb } from "../../api/getOffersFromDb";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

function OffertsSearch({ searchProps }) {
  const [
    search,
    setSearch,
    localization,
    setLocalization,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    type,
    setType,
    setOffers,
    setIsLoading,
    setError,
  ] = searchProps;

  const getCriteriaObj = (search, minPrice, maxPrice, type, localization) => {
    return {
      tytul: search,
      miasto: localization,
      kategoria: type,
      minCena: minPrice,
      maxCena: maxPrice,
    };
  };
  let retryCount = 0;
  const fetchFromDb = async () => {
    const maxRetries = 3; //TO DO do constow

    setError(null);
    setIsLoading(true);

    const response = await getOffersFromDb(
      getCriteriaObj(search, minPrice, maxPrice, type, localization),
    );

    if (!response.success && retryCount < maxRetries) {
      retryCount++;
      console.log(`Retry ${retryCount}/${maxRetries} in 2s...`);
      setTimeout(() => fetchFromDb(), 2000);
    } else if (response.success) {
      setOffers(response.data);
      setIsLoading(false);
    } else {
      console.error("Max retries exceeded");
      setError("Ładowanie ofert nie powiodło się.");
      setIsLoading(false);
      console.error("Powód:", response.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchFromDb();
  };

  const handleMaxPriceChange = (e) => {
    setPriceTo(e.target.value === "" ? null : val);
  };

  return (
    <Grid sx={{ px: "5%" }}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            width: "100%",

            alignItems: "flex-end",
          }}
          spacing={2}
        >
          <Grid item size={3} sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              label="Wyszukaj oferty"
              variant="standard"
              value={search}
              defaultValue={null}
              onChange={(e) =>
                setSearch(e.target.value === "" ? null : e.target.value)
              }
            />
          </Grid>

          <Grid item size={2}>
            <TextField
              fullWidth
              label="Lokalizacja"
              variant="standard"
              value={localization}
              defaultValue={null}
              onChange={(e) =>
                setLocalization(e.target.value === "" ? null : e.target.value)
              }
            />
          </Grid>
          <Grid item size={2}>
            <OffertTypeSelect type={type} setType={setType} />
          </Grid>
          <Grid item size={2}>
            <TextField
              fullWidth
              label="Cena od"
              variant="outlined"
              type="number"
              value={minPrice}
              defaultValue={null}
              onChange={(e) =>
                setMinPrice(e.target.value === "" ? null : e.target.value)
              }
            />
          </Grid>
          <Grid item size={2}>
            <TextField
              fullWidth
              label="Cena do"
              variant="outlined"
              type="number"
              value={maxPrice}
              defaultValue={null}
              onChange={(e) => handleMaxPriceChange(e)}
            />
          </Grid>
          <Grid item size={1}>
            <Button type="submit" variant="contained" sx={{ width: "100%" }}>
              wyszukaj
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default OffertsSearch;
