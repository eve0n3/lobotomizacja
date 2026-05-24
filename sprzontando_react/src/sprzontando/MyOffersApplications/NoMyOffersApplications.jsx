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
import {
  ACTIVE,
  APPLIED,
  BANNED,
  ENDED,
  IN_PROGRESS,
} from "../../../utils/consts";

function NoMyOffersApplications({ mode }) {
  const getTitle = (mode) => {
    switch (mode) {
      case APPLIED:
        return "Nie zglosiłeś się jeszcze do żadnej aktywnej oferty";
        break;
      case ENDED:
        return "Nie zakończyłeś jeszcze żadnej oferty";
        break;
      case IN_PROGRESS:
        return `Tu pojawią się zlecenia do których zostałeś wybrany`;
        break;

      default:
        break;
    }
  };
  const getSubtitle = (mode) => {
    switch (mode) {
      case APPLIED:
        return `możesz to zrobic w zagłedce "Ogłoszenia"`;
        break;
      case IN_PROGRESS:
        return `na razie nie masz żadnych zaczętych zleceń`;
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

export default NoMyOffersApplications;
