import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  noOffersContainer,
  noOffersIcon,
  noOffersTitle,
  noOffersText,
} from "../../styles/noOffers.styles";

function NoReportedOffers() {
  return (
    <Box sx={noOffersContainer}>
      <HighlightOffIcon sx={noOffersIcon} />
      <Typography variant="h6" sx={noOffersTitle}>
        Brak zgłoszonych ofert
      </Typography>
      <Typography variant="body2" sx={noOffersText}>
        Użytkownicy nie zgłosili nic podejrzanego
      </Typography>
    </Box>
  );
}

export default NoReportedOffers;
