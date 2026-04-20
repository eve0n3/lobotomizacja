import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ImagePlaceHolder from "../../components/ImagePlaceHolder";
import Divider from "@mui/material/Divider";
import {
  OF_CITY,
  OF_DATE,
  OF_PRICE,
  OF_TITLE,
  OF_TYPE,
} from "../../../utils/consts";

import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { nowToPlDate } from "../../../utils/utilisTime";
import Paper from "@mui/material/Paper";
import {
  biggerIcon,
  icon,
  infoGrid,
  itemBox,
  itemStack,
  offerPaper,
  priceGrid,
  titleGrid,
} from "../../styles/offersListItem.styles";
import {
  FONT_SIZE_LG,
  FONT_SIZE_XL,
  FONT_SIZE_XXL,
} from "../../../utils/styleConsts";
import { flexCentered } from "../../styles/AppStyle";

function OffersListItem({ offer }) {
  return (
    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
      <Paper sx={offerPaper}>
        <Box sx={itemBox}>
          <Stack sx={itemStack}>
            <ImagePlaceHolder />
          </Stack>
        </Box>
        <Grid sx={flexCentered} container spacing={2}>
          <Grid item size={12} sx={titleGrid}>
            <Typography sx={{ fontSize: FONT_SIZE_XXL }}>
              {offer[OF_TITLE]}
            </Typography>
          </Grid>

          <Grid item size={4} sx={infoGrid}>
            <PinDropOutlinedIcon sx={icon} />
            <Typography sx={{ fontSize: FONT_SIZE_LG }}>
              {offer[OF_CITY]}
            </Typography>
          </Grid>
          <Grid item size={4} sx={infoGrid}>
            <TodayOutlinedIcon sx={icon} />
            <Typography sx={{ fontSize: FONT_SIZE_LG }}>
              {nowToPlDate(offer[OF_DATE])}
            </Typography>
          </Grid>
          <Grid item size={4} sx={priceGrid}>
            <PaymentsOutlinedIcon sx={biggerIcon} />
            <Typography sx={{ fontSize: FONT_SIZE_XL }}>
              {offer[OF_PRICE]}zł
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default OffersListItem;
