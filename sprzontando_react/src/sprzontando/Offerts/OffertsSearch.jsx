import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import OffertTypeSelect from "./OffertTypeSelect";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { getOffersFromDb } from "../../api/getOffersFromDb";

function OffertsSearch({ searchProps }) {
  const [
    search,
    setSearch,
    localization,
    setLocalization,
    price,
    setPrice,
    type,
    setType,
    setOffers,
    setIsLoading,
    setError,
  ] = searchProps;

  const getCriteriaObj = (search, price, type, localization) => {
    return {
      miasto: localization,
      kategoria: type,
      cena: price,
    };
  };
  let retryCount = 0;
  const fatchFromDb = async () => {
    const maxRetries = 3; //TO DO do constow

    console.log(
      "search, price, type, localization",
      search,
      price,
      type,
      localization,
    );
    setError(null);
    setIsLoading(true);

    const response = await getOffersFromDb(
      getCriteriaObj(search, price, type, localization),
    );

    if (!response.success && retryCount < maxRetries) {
      retryCount++;
      console.log(`Retry ${retryCount}/${maxRetries} in 2s...`);
      setTimeout(() => fatchFromDb(), 2000);
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
    await fatchFromDb();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
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
            <TextField
              fullWidth
              label="Cena"
              variant="standard"
              defaultValue={null}
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? null : e.target.value)
              }
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
