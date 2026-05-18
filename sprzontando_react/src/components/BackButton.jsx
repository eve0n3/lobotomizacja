import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = ({ fallback = "/", backLocation }) => {
  const navigate = useNavigate();
  const canGoBack = window.history.length > 1;
  console.log(backLocation);

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "absolute", top: 0, left: 0 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() =>
            backLocation
              ? navigate(backLocation)
              : navigate(canGoBack ? -1 : fallback)
          }
        >
          Powrót
        </Button>
      </Box>
    </Box>
  );
};
export default BackButton;
