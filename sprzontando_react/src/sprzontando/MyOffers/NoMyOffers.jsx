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
import { ACTIVE, BANNED, ENDED } from "../../../utils/consts";

function NoMyOffers({ mode }) {
  const getTitle = (mode) => {
    switch (mode) {
      case ACTIVE:
        return "Nie stworzyłeś jeszcze żadnej aktywnej oferty";
        break;
      case ENDED:
        return "Nie ma jeszcze żadnych zakończonych ofert";
        break;
      case BANNED:
        return "Nie ma jeszcze żadnych zbanowanych ofert";
        break;

      default:
        break;
    }
  };
  const getSubtitle = (mode) => {
    switch (mode) {
      case ACTIVE:
        return (
          <>
            <Typography variant="body2" sx={noOffersText}>
              Możesz stworzyć swoją pierwszą ofertę, klikając przycisk
            </Typography>
            <AddCircleIcon color="primary" />
            <Typography variant="body2" sx={noOffersText}>
              w prawym dolnym rogu ekranu
            </Typography>
          </>
        );
        break;

      default:
        break;
    }
  };
  return (
    <Box sx={noOffersContainer}>
      <SearchOffIcon sx={noOffersIcon} />
      <Typography variant="h6" sx={noOffersTitle}>
        {getTitle(mode)}
      </Typography>
      <Box sx={flexCentered}>{getSubtitle(mode)}</Box>
    </Box>
  );
}

export default NoMyOffers;
