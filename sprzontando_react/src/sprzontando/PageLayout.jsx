import Container from "@mui/material/Container";
import SidePanel from "./sidePanel/SidePanel";
import { Outlet, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CleanHandsIcon from "@mui/icons-material/CleanHands";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ToolbarLoggedUser from "../components/User.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "moment/locale/pl";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { getLoggedUser } from "../../utils/utilis.js";

function PageLayout() {
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pl">
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Typography
              variant="h4"
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <CleanHandsIcon />
              Sprzontando
            </Typography>
            {!loggedUser ? (
              <Button variant="contained" onClick={() => navigate("/login")}>
                ZALOGUJ SIĘ
              </Button>
            ) : (
              <ToolbarLoggedUser loggedUser={loggedUser} />
            )}
          </Toolbar>
        </AppBar>
        <SidePanel />
        <Grid
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8, // pushes below AppBar
            width: `calc(100% - ${250}px)`,
          }}
        >
          <Outlet />
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}

export default PageLayout;
