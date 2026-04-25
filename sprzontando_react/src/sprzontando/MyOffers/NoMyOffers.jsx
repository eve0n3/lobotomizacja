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

function NoMyOffers() {
  return (
    <Box sx={noOffersContainer}>
      <SearchOffIcon sx={noOffersIcon} />
      <Typography variant="h6" sx={noOffersTitle}>
        Nie stworzyłeś jeszcze żadnej oferty
      </Typography>
      <Typography variant="body2" sx={noOffersText}>
        Możesz stworzyć swoją pierwszą ofertę, klikając przycisk + w prawym
        dolnym rogu ekranu
      </Typography>
    </Box>
  );
}

export default NoMyOffers;
