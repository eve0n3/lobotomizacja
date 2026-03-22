import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import {
  noOffersContainer,
  noOffersIcon,
  noOffersTitle,
  noOffersText,
} from "../../styles/noOffers.styles";

function NoOffers() {
  return (
    <Box sx={noOffersContainer}>
      <SearchOffIcon sx={noOffersIcon} />
      <Typography variant="h6" sx={noOffersTitle}>
        Brak dostępnych ofert
      </Typography>
      <Typography variant="body2" sx={noOffersText}>
        Spróbuj zmienić kryteria wyszukiwania
      </Typography>
    </Box>
  );
}

export default NoOffers;
