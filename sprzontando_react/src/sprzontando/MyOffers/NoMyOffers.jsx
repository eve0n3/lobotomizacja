import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  noOffersContainer,
  noOffersIcon,
  noOffersTitle,
  noOffersText,
} from "../../styles/noOffers.styles";
import { flexCentered } from "../../styles/AppStyle";

function NoMyOffers() {
  return (
    <Box sx={noOffersContainer}>
      <SearchOffIcon sx={noOffersIcon} />
      <Typography variant="h6" sx={noOffersTitle}>
        Nie stworzyłeś jeszcze żadnej oferty
      </Typography>
      <Box sx={flexCentered}>
        <Typography variant="body2" sx={noOffersText}>
          Możesz stworzyć swoją pierwszą ofertę, klikając przycisk
        </Typography>
        <AddCircleIcon color="primary" />
        <Typography variant="body2" sx={noOffersText}>
          w prawym dolnym rogu ekranu
        </Typography>
      </Box>
    </Box>
  );
}

export default NoMyOffers;
