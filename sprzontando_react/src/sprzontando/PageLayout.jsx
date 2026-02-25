import Container from "@mui/material/Container";
import SidePanel from "./sidePanel/SidePanel";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CleanHandsIcon from "@mui/icons-material/CleanHands";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function PageLayout() {
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sprzontando
          </Typography>
          <Button variant="contained">ZALOGUJ SIĘ</Button>
        </Toolbar>
      </AppBar>
      <SidePanel Container />
      <Box
        component="main"
        sx={{
          marginTop: "64px",
          marginLeft: "250px",
          padding: 3,
          width: "calc(100vw - 250px)",
          height: "calc(100vh - 64px)",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default PageLayout;
