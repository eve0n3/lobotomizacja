import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = ({ fallback = "/" }) => {
  const navigate = useNavigate();
  const canGoBack = window.history.length > 1;

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "absolute", top: 0, left: 0 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => (canGoBack ? navigate(-1) : navigate(fallback))}
        >
          Powrót
        </Button>
      </Box>
    </Box>
  );
};
export default BackButton;
