import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

const PriceInputs = ({ inputsProps }) => {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice, setDisableSearch } =
    inputsProps;
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);

  const handleMinPriceChange = (e) => {
    const inputValue = e.target.value;

    // Allow empty input
    if (inputValue === "") {
      setMinPrice(null);
      setMinError(false);
      setDisableSearch(false);
      return;
    }

    const value = Number(inputValue);
    setMinPrice(value);
    if (value && maxPrice && value > maxPrice) {
      setMinError(true);
      setDisableSearch(true);
    } else {
      setMinError(false);
      setDisableSearch(false);
    }
  };

  const handleMaxPriceChange = (e) => {
    const inputValue = e.target.value;

    // Allow empty input
    if (inputValue === "") {
      setMaxPrice(null);
      setMaxError(false);
      setDisableSearch(false);
      return;
    }

    const value = Number(inputValue);
    setMaxPrice(value);
    if (value && minPrice && value < minPrice) {
      setMaxError(true);
      setDisableSearch(true);
    } else {
      setMaxError(false);
      setDisableSearch(false);
    }
  };

  const handleKeyPress = (e) => {
    // Only allow digits (0-9) and backspace
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  return (
    <Grid spacing={2} container>
      <Grid item size={6}>
        <Box>
          <Tooltip
            arrow
            title={minError ? "Musi być mniejsza niż cena do" : ""}
            open={minError}
            placement="bottom"
          >
            <TextField
              fullWidth
              label="Cena od"
              variant="outlined"
              type="number"
              value={minPrice || null}
              defaultValue={null}
              onChange={handleMinPriceChange}
              onKeyPress={handleKeyPress}
              error={minError}
            />
          </Tooltip>
        </Box>
      </Grid>
      <Grid item size={6}>
        <Box>
          <Tooltip
            title={maxError ? "Musi być większa niż cena od" : ""}
            open={maxError}
            arrow
            placement="bottom"
          >
            <TextField
              fullWidth
              label="Cena do"
              variant="outlined"
              type="number"
              value={maxPrice || null}
              defaultValue={null}
              onChange={handleMaxPriceChange}
              onKeyPress={handleKeyPress}
              error={maxError}
            />
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};
export default PriceInputs;
