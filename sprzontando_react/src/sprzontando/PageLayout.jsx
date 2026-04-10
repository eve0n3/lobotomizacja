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
import Cookies from "js-cookie";

function PageLayout() {
  const navigate = useNavigate();
  const loggedas =Cookies.get("loggedas") ? JSON.parse(Cookies.get("loggedas")) : null;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            <CleanHandsIcon />
            Sprzontando
          </Typography>
          {!loggedas ? (
            <Button variant="contained" onClick={() => navigate("/login")}>
              ZALOGUJ SIĘ
            </Button>
          ) : (
            <ToolbarLoggedUser loggedas={loggedas} />
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
  );
}

export default PageLayout;
