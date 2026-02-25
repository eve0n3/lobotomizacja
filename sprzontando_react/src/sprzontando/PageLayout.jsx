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

function PageLayout() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <CleanHandsIcon />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Sprzontando
          </Typography>
          <Button variant="contained" onClick={() => navigate("/login")}>
            ZALOGUJ SIĘ
          </Button>
        </Toolbar>
      </AppBar>
      <SidePanel />
      <Box
        component="main"
        sx={{
          display: "flex",
          marginTop: "64px",
          marginLeft: "250px",
          padding: 2,
          width: "100%",
          height: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default PageLayout;
